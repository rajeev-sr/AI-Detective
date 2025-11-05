"""
Flask API routes
"""

from flask import Blueprint, request, jsonify
from models.case_data import CaseData
from models.game_state import GameState
from algorithms.csp_solver import CSPSolver
from algorithms.astar_search import AStarSearch
from algorithms.minimax import InterrogationTree

api = Blueprint('api', __name__)

# Global game state (in production, use sessions or database)
game_sessions = {}

@api.route('/game/start', methods=['POST'])
def start_game():
    """Initialize a new game"""
    session_id = request.json.get('session_id', 'default')
    
    case_data = CaseData()
    game_state = GameState(case_data)
    
    game_sessions[session_id] = {
        'case_data': case_data,
        'game_state': game_state
    }
    
    return jsonify({
        'success': True,
        'session_id': session_id,
        'available_actions': [
            {
                'id': e['id'],
                'action': e['action'],
                'cost': e['cost']
            }
            for e in case_data.get_available_actions()
        ],
        'game_state': game_state.to_dict()
    })

@api.route('/game/action', methods=['POST'])
def take_action():
    """Take an investigation action"""
    session_id = request.json.get('session_id', 'default')
    evidence_id = request.json.get('evidence_id')
    
    if session_id not in game_sessions:
        return jsonify({'success': False, 'error': 'Game not found'}), 404
    
    case_data = game_sessions[session_id]['case_data']
    game_state = game_sessions[session_id]['game_state']
    
    # Discover evidence
    evidence = case_data.discover_evidence(evidence_id)
    if not evidence:
        return jsonify({'success': False, 'error': 'Evidence not found'}), 404
    
    # Apply to game state
    game_state.take_action(evidence)
    
    # Run CSP solver
    csp = CSPSolver(game_state.current_domains.copy(), game_state.constraints)
    csp_result = csp.solve()
    csp.arc_consistency_step_by_step()
    
    return jsonify({
        'success': True,
        'evidence': {
            'action': evidence['action'],
            'clue': evidence['clue'],
            'cost': evidence['cost']
        },
        'game_state': game_state.to_dict(),
        'csp_result': {
            'possible_solutions': csp_result['count'],
            'current_domains': csp_result['domains'],
            'steps': csp.get_visualization_steps()
        },
        'available_actions': [
            {
                'id': e['id'],
                'action': e['action'],
                'cost': e['cost']
            }
            for e in case_data.get_available_actions()
        ]
    })

@api.route('/ai/suggest', methods=['POST'])
def ai_suggest():
    """Get AI suggestion using A* search"""
    session_id = request.json.get('session_id', 'default')
    
    if session_id not in game_sessions:
        return jsonify({'success': False, 'error': 'Game not found'}), 404
    
    case_data = game_sessions[session_id]['case_data']
    game_state = game_sessions[session_id]['game_state']
    
    # Run A* search
    astar = AStarSearch(case_data, game_state)
    suggestion = astar.suggest_next_action()
    
    if not suggestion:
        return jsonify({
            'success': False,
            'message': 'No more actions available'
        })
    
    return jsonify({
        'success': True,
        'suggestion': {
            'action': suggestion['recommended_action']['action'],
            'evidence_id': suggestion['recommended_action']['id'],
            'explanation': suggestion['explanation']
        },
        'all_evaluations': suggestion['all_evaluations']
    })

@api.route('/ai/minimax', methods=['POST'])
def minimax_interrogation():
    """Get best interrogation question using minimax"""
    interrogation = InterrogationTree()
    result = interrogation.get_best_question()
    
    return jsonify({
        'success': True,
        'best_question': {
            'id': result['best_question']['id'],
            'question': result['best_question']['question']
        },
        'all_evaluations': result['all_evaluations'],
        'game_tree': result['game_tree']
    })

@api.route('/interrogation/ask', methods=['POST'])
def ask_question():
    """Ask an interrogation question"""
    question_id = request.json.get('question_id')
    
    interrogation = InterrogationTree()
    result = interrogation.simulate_interrogation(question_id)
    
    if not result:
        return jsonify({'success': False, 'error': 'Question not found'}), 404
    
    return jsonify({
        'success': True,
        'result': result
    })

@api.route('/game/accuse', methods=['POST'])
def make_accusation():
    """Make final accusation"""
    session_id = request.json.get('session_id', 'default')
    guess = request.json.get('guess')  # {suspect, weapon, location}
    
    if session_id not in game_sessions:
        return jsonify({'success': False, 'error': 'Game not found'}), 404
    
    game_state = game_sessions[session_id]['game_state']
    
    is_correct = game_state.check_solution(guess)
    game_state.is_solved = is_correct
    
    return jsonify({
        'success': True,
        'correct': is_correct,
        'solution': game_sessions[session_id]['case_data'].solution if is_correct else None,
        'game_state': game_state.to_dict()
    })