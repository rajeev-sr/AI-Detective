"""
Game state management
"""

class GameState:
    def __init__(self, case_data):
        self.case_data = case_data
        self.current_domains = {
            'suspect': case_data.domains['suspect'].copy(),
            'weapon': case_data.domains['weapon'].copy(),
            'location': case_data.domains['location'].copy()
        }
        self.constraints = []
        self.actions_taken = []
        self.total_cost = 0
        self.is_solved = False
        
    def apply_constraint(self, constraint):
        """Apply a constraint to reduce domains"""
        self.constraints.append(constraint)
        
        # Handle eliminates
        if 'eliminates' in constraint:
            for var_type, values in constraint['eliminates'].items():
                if var_type in self.current_domains:
                    for val in values:
                        if val in self.current_domains[var_type]:
                            self.current_domains[var_type].remove(val)
        
        # Handle confirms (keep only confirmed values)
        if 'confirms' in constraint:
            for var_type, value in constraint['confirms'].items():
                if var_type in self.current_domains:
                    if value in self.current_domains[var_type]:
                        self.current_domains[var_type] = [value]
    
    def take_action(self, evidence):
        """Take an investigation action"""
        self.actions_taken.append(evidence['action'])
        self.total_cost += evidence['cost']
        self.apply_constraint(evidence['constraint'])
        
    def check_solution(self, guess):
        """Check if user's guess matches the solution"""
        solution = self.case_data.solution
        return (guess['suspect'] == solution['suspect'] and
                guess['weapon'] == solution['weapon'] and
                guess['location'] == solution['location'])
    
    def get_possible_solutions_count(self):
        """Count remaining possible combinations"""
        return (len(self.current_domains['suspect']) *
                len(self.current_domains['weapon']) *
                len(self.current_domains['location']))
    
    def to_dict(self):
        """Convert state to dictionary for API response"""
        return {
            'current_domains': self.current_domains,
            'constraints_count': len(self.constraints),
            'actions_taken': self.actions_taken,
            'total_cost': self.total_cost,
            'possible_solutions': self.get_possible_solutions_count(),
            'is_solved': self.is_solved
        }