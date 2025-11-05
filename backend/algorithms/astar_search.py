"""
A* Search Algorithm for finding optimal investigation path
"""

import heapq
from typing import List, Dict, Tuple

class InvestigationNode:
    def __init__(self, state, action=None, parent=None, cost=0):
        self.state = state  # Current game state (which evidence discovered)
        self.action = action  # Action that led to this state
        self.parent = parent
        self.g_cost = cost  # Actual cost from start
        self.h_cost = 0  # Heuristic cost to goal
        self.f_cost = 0  # Total cost (g + h)
        
    def __lt__(self, other):
        return self.f_cost < other.f_cost

class AStarSearch:
    def __init__(self, case_data, current_state):
        self.case_data = case_data
        self.current_state = current_state
        self.explored_nodes = []
        
    def heuristic(self, domains):
        """
        Heuristic function: estimate remaining actions needed
        h(n) = number of variables not yet narrowed to single value
        """
        h = 0
        for var_type, values in domains.items():
            if len(values) > 1:
                h += len(values) - 1
        return h
    
    def is_goal(self, domains):
        """Check if we've narrowed down to single solution"""
        return all(len(values) == 1 for values in domains.values())
    
    def get_successors(self, node):
        """Get all possible next actions from current state"""
        successors = []
        available_actions = self.case_data.get_available_actions()
        
        for evidence in available_actions:
            # Simulate applying this action
            new_domains = {k: v.copy() for k, v in node.state.items()}
            
            # Apply constraint
            if 'eliminates' in evidence['constraint']:
                for var_type, values in evidence['constraint']['eliminates'].items():
                    if var_type in new_domains:
                        new_domains[var_type] = [v for v in new_domains[var_type] 
                                                  if v not in values]
            
            new_node = InvestigationNode(
                state=new_domains,
                action=evidence,
                parent=node,
                cost=node.g_cost + evidence['cost']
            )
            successors.append(new_node)
        
        return successors
    
    def search(self):
        """
        Execute A* search to find optimal investigation path
        Returns: best action to take next with explanation
        """
        # Start node
        start_node = InvestigationNode(
            state=self.current_state.current_domains.copy(),
            cost=self.current_state.total_cost
        )
        start_node.h_cost = self.heuristic(start_node.state)
        start_node.f_cost = start_node.g_cost + start_node.h_cost
        
        # Priority queue (min-heap)
        frontier = []
        heapq.heappush(frontier, start_node)
        
        explored = set()
        nodes_explored = 0
        
        while frontier:
            current = heapq.heappop(frontier)
            nodes_explored += 1
            
            # Store for visualization
            self.explored_nodes.append({
                'state': current.state,
                'action': current.action['action'] if current.action else 'Start',
                'g_cost': current.g_cost,
                'h_cost': current.h_cost,
                'f_cost': current.f_cost
            })
            
            # Goal check
            if self.is_goal(current.state):
                path = self.reconstruct_path(current)
                return {
                    'success': True,
                    'next_action': path[0] if path else None,
                    'optimal_path': path,
                    'total_cost': current.g_cost,
                    'nodes_explored': nodes_explored,
                    'path_length': len(path),
                    'explored_nodes': self.explored_nodes
                }
            
            # Generate state signature for explored set
            state_sig = str(sorted([(k, tuple(sorted(v))) for k, v in current.state.items()]))
            if state_sig in explored:
                continue
            explored.add(state_sig)
            
            # Expand successors
            for successor in self.get_successors(current):
                successor.h_cost = self.heuristic(successor.state)
                successor.f_cost = successor.g_cost + successor.h_cost
                heapq.heappush(frontier, successor)
        
        return {
            'success': False,
            'message': 'No solution found',
            'nodes_explored': nodes_explored
        }
    
    def reconstruct_path(self, node):
        """Reconstruct path from goal to start"""
        path = []
        current = node
        while current.parent is not None:
            path.append(current.action)
            current = current.parent
        path.reverse()
        return path
    
    def suggest_next_action(self):
        """
        Simplified version: suggest the best immediate next action
        without finding complete path
        """
        available_actions = self.case_data.get_available_actions()
        if not available_actions:
            return None
        
        best_action = None
        best_score = float('inf')
        
        evaluations = []
        
        for evidence in available_actions:
            # Simulate applying this action
            test_domains = {k: v.copy() for k, v in self.current_state.current_domains.items()}
            
            # Apply constraint
            if 'eliminates' in evidence['constraint']:
                for var_type, values in evidence['constraint']['eliminates'].items():
                    if var_type in test_domains:
                        test_domains[var_type] = [v for v in test_domains[var_type] 
                                                   if v not in values]
            
            # Calculate f(n) = g(n) + h(n)
            g = self.current_state.total_cost + evidence['cost']
            h = self.heuristic(test_domains)
            f = g + h
            
            evaluations.append({
                'action': evidence['action'],
                'evidence_id': evidence['id'],
                'g_cost': g,
                'h_cost': h,
                'f_cost': f,
                'resulting_domains': test_domains
            })
            
            if f < best_score:
                best_score = f
                best_action = evidence
        
        # Sort by f_cost for display
        evaluations.sort(key=lambda x: x['f_cost'])
        
        return {
            'recommended_action': best_action,
            'all_evaluations': evaluations,
            'explanation': f"Action '{best_action['action']}' has lowest f-cost ({best_score:.1f})"
        }