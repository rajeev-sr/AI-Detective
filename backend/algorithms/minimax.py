"""
Minimax Algorithm for interrogation game tree
"""

class InterrogationTree:
    def __init__(self):
        # Question database with responses
        self.questions = {
            'Chef': [
                {
                    'id': 1,
                    'question': 'Where were you at 10 PM?',
                    'responses': [
                        {'type': 'truth', 'text': 'I was in the kitchen preparing dessert', 'utility': 5, 'reveals': True},
                        {'type': 'lie', 'text': 'I was in my quarters sleeping', 'utility': -2, 'reveals': False},
                        {'type': 'evade', 'text': 'I do not remember exactly', 'utility': 0, 'reveals': False}
                    ]
                },
                {
                    'id': 2,
                    'question': 'Do you know anything about poison?',
                    'responses': [
                        {'type': 'truth', 'text': 'Yes, I use it for rat control', 'utility': 3, 'reveals': True},
                        {'type': 'lie', 'text': 'No, I have never handled poison', 'utility': -1, 'reveals': False},
                        {'type': 'evade', 'text': 'Why do you ask?', 'utility': 0, 'reveals': False}
                    ]
                },
                {
                    'id': 3,
                    'question': 'Why are your fingerprints on the poison bottle?',
                    'responses': [
                        {'type': 'truth', 'text': 'I used it yesterday for the rats', 'utility': 8, 'reveals': True},
                        {'type': 'lie', 'text': 'Those must be old prints', 'utility': -3, 'reveals': False},
                        {'type': 'evade', 'text': 'I touch many things in the kitchen', 'utility': 1, 'reveals': False}
                    ]
                }
            ]
        }
        
        # Suspect personality affects response probability
        self.suspect_personality = {
            'Chef': {
                'truth_prob': 0.3,
                'lie_prob': 0.5,
                'evade_prob': 0.2
            }
        }
    
    def minimax(self, depth, is_maximizing, alpha=float('-inf'), beta=float('inf'), question_id=None):
        """
        Minimax with alpha-beta pruning
        Detective (MAX) wants to maximize info gain
        Suspect (MIN) wants to minimize info revealed
        """
        # Base case
        if depth == 0 or question_id is None:
            return 0, None
        
        question = next((q for q in self.questions['Chef'] if q['id'] == question_id), None)
        if not question:
            return 0, None
        
        if is_maximizing:
            # Detective's turn - choose question
            max_eval = float('-inf')
            best_question = None
            
            for q in self.questions['Chef']:
                eval_score = self.evaluate_question(q)
                if eval_score > max_eval:
                    max_eval = eval_score
                    best_question = q
            
            return max_eval, best_question
        
        else:
            # Suspect's turn - choose response
            min_eval = float('inf')
            best_response = None
            
            for response in question['responses']:
                eval_score = response['utility']
                if eval_score < min_eval:
                    min_eval = eval_score
                    best_response = response
            
            return min_eval, best_response
    
    def evaluate_question(self, question):
        """
        Evaluate expected utility of a question
        Uses suspect personality to weight responses
        """
        expected_value = 0
        personality = self.suspect_personality['Chef']
        
        for response in question['responses']:
            if response['type'] == 'truth':
                prob = personality['truth_prob']
            elif response['type'] == 'lie':
                prob = personality['lie_prob']
            else:
                prob = personality['evade_prob']
            
            expected_value += prob * response['utility']
        
        return expected_value
    
    def get_best_question(self):
        """Get the best question to ask using minimax"""
        best_score = float('-inf')
        best_question = None
        evaluations = []
        
        for question in self.questions['Chef']:
            score = self.evaluate_question(question)
            evaluations.append({
                'question': question['question'],
                'expected_utility': round(score, 2),
                'id': question['id']
            })
            
            if score > best_score:
                best_score = score
                best_question = question
        
        # Sort by expected utility
        evaluations.sort(key=lambda x: x['expected_utility'], reverse=True)
        
        return {
            'best_question': best_question,
            'all_evaluations': evaluations,
            'game_tree': self.build_game_tree_visualization()
        }
    
    def build_game_tree_visualization(self):
        """Build game tree structure for visualization"""
        tree = []
        
        for question in self.questions['Chef']:
            node = {
                'question': question['question'],
                'expected_value': self.evaluate_question(question),
                'children': []
            }
            
            for response in question['responses']:
                node['children'].append({
                    'response': response['text'],
                    'type': response['type'],
                    'utility': response['utility']
                })
            
            tree.append(node)
        
        return tree
    
    def simulate_interrogation(self, question_id):
        """Simulate asking a question and getting response"""
        question = next((q for q in self.questions['Chef'] if q['id'] == question_id), None)
        if not question:
            return None
        
        # Use minimax to determine suspect's response
        _, best_response = self.minimax(1, False, question_id=question_id)
        
        # Randomly choose based on personality (more realistic)
        import random
        personality = self.suspect_personality['Chef']
        rand = random.random()
        
        if rand < personality['truth_prob']:
            response_type = 'truth'
        elif rand < personality['truth_prob'] + personality['lie_prob']:
            response_type = 'lie'
        else:
            response_type = 'evade'
        
        response = next((r for r in question['responses'] if r['type'] == response_type), question['responses'][0])
        
        return {
            'question': question['question'],
            'response': response['text'],
            'response_type': response['type'],
            'utility_gained': response['utility'],
            'reveals_info': response['reveals']
        }