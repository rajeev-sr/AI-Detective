"""
CSP Solver with Arc Consistency (AC-3 Algorithm)
Implemented from scratch without external dependencies
"""

class CSPSolver:
    def __init__(self, domains, constraints):
        self.domains = {k: v.copy() for k, v in domains.items()}
        self.constraints = constraints
        self.steps = []  # For visualization
        
    def solve(self):
        """
        Solve CSP using constraint propagation and backtracking
        Returns all valid solutions
        """
        # First apply arc consistency
        self.arc_consistency_ac3()
        
        # Then find all solutions using backtracking
        solutions = []
        assignment = {}
        self._backtrack(assignment, solutions)
        
        return {
            'solutions': solutions,
            'count': len(solutions),
            'domains': self.domains
        }
    
    def _backtrack(self, assignment, solutions):
        """
        Backtracking search to find all valid assignments
        """
        # Check if assignment is complete
        if len(assignment) == len(self.domains):
            solutions.append(assignment.copy())
            return
        
        # Select unassigned variable
        var = self._select_unassigned_variable(assignment)
        
        # Try each value in domain
        for value in self.domains[var]:
            if self._is_consistent(var, value, assignment):
                assignment[var] = value
                self._backtrack(assignment, solutions)
                del assignment[var]
    
    def _select_unassigned_variable(self, assignment):
        """Select next variable to assign (MRV heuristic)"""
        unassigned = [v for v in self.domains.keys() if v not in assignment]
        # Choose variable with smallest domain (Minimum Remaining Values)
        return min(unassigned, key=lambda v: len(self.domains[v]))
    
    def _is_consistent(self, var, value, assignment):
        """Check if assignment is consistent with constraints"""
        # For this simple case, we don't have complex binary constraints
        # between variables, so we just check if value is in domain
        return value in self.domains[var]
    
    def arc_consistency_ac3(self):
        """
        AC-3 Algorithm for arc consistency
        """
        # Initialize queue with all arcs
        queue = []
        variables = list(self.domains.keys())
        
        for xi in variables:
            for xj in variables:
                if xi != xj:
                    queue.append((xi, xj))
        
        self.steps.append({
            'step': 'Initialize',
            'queue_size': len(queue),
            'domains': {k: v.copy() for k, v in self.domains.items()},
            'message': f'Starting AC-3 with {len(queue)} arcs'
        })
        
        # Process queue
        while queue:
            xi, xj = queue.pop(0)
            
            if self._revise(xi, xj):
                if len(self.domains[xi]) == 0:
                    self.steps.append({
                        'step': 'Failure',
                        'variable': xi,
                        'domains': {k: v.copy() for k, v in self.domains.items()},
                        'message': f'Domain of {xi} became empty! Inconsistent.'
                    })
                    return False
                
                # Add neighbors back to queue
                for xk in variables:
                    if xk != xi and xk != xj:
                        queue.append((xk, xi))
                
                self.steps.append({
                    'step': 'Revised',
                    'arc': (xi, xj),
                    'domains': {k: v.copy() for k, v in self.domains.items()},
                    'message': f'Revised domain of {xi}'
                })
        
        self.steps.append({
            'step': 'Complete',
            'domains': {k: v.copy() for k, v in self.domains.items()},
            'message': 'Arc consistency achieved!'
        })
        
        return True
    
    def _revise(self, xi, xj):
        """
        Make xi arc-consistent with xj
        Returns True if domain of xi was revised
        """
        revised = False
        
        # Check each value in xi's domain
        for x in self.domains[xi][:]:  # Create copy to iterate
            # Check if there exists a value in xj's domain that satisfies constraint
            # For our detective game, variables are independent, so this is simplified
            # In a real CSP with binary constraints, we'd check constraint satisfaction
            
            # This is placeholder logic - in practice, you'd check actual constraints
            # For now, we just ensure domains aren't empty
            if not self.domains[xj]:
                self.domains[xi].remove(x)
                revised = True
        
        return revised
    
    def arc_consistency_step_by_step(self):
        """
        Run AC-3 algorithm with step-by-step tracking (already done in arc_consistency_ac3)
        This method is for compatibility
        """
        if not self.steps:
            self.arc_consistency_ac3()
        return True
    
    def get_visualization_steps(self):
        """Return steps for frontend visualization"""
        return self.steps
    
    def eliminate_values(self, var_type, values_to_remove):
        """
        Eliminate specific values from a variable's domain
        This is the main method used when applying game constraints
        """
        if var_type not in self.domains:
            return
        
        original_domain = self.domains[var_type].copy()
        self.domains[var_type] = [v for v in self.domains[var_type] 
                                   if v not in values_to_remove]
        
        removed = [v for v in original_domain if v not in self.domains[var_type]]
        
        if removed:
            self.steps.append({
                'step': 'Elimination',
                'variable': var_type,
                'removed': removed,
                'remaining': self.domains[var_type].copy(),
                'original': original_domain,
                'message': f'Eliminated {len(removed)} value(s) from {var_type}: {", ".join(removed)}'
            })
    
    def keep_only_values(self, var_type, values_to_keep):
        """
        Keep only specific values in a variable's domain (used for 'confirms' constraints)
        """
        if var_type not in self.domains:
            return
        
        original_domain = self.domains[var_type].copy()
        
        if isinstance(values_to_keep, str):
            values_to_keep = [values_to_keep]
        
        self.domains[var_type] = [v for v in self.domains[var_type] 
                                   if v in values_to_keep]
        
        removed = [v for v in original_domain if v not in self.domains[var_type]]
        
        if removed:
            self.steps.append({
                'step': 'Confirmation',
                'variable': var_type,
                'kept': self.domains[var_type].copy(),
                'removed': removed,
                'message': f'Confirmed {var_type}: {", ".join(self.domains[var_type])}'
            })
    
    def apply_constraint(self, constraint):
        """
        Apply a constraint to the CSP
        Used when new evidence is discovered
        """
        # Handle 'eliminates' constraints
        if 'eliminates' in constraint:
            for var_type, values in constraint['eliminates'].items():
                if isinstance(values, str):
                    values = [values]
                self.eliminate_values(var_type, values)
        
        # Handle 'confirms' constraints
        if 'confirms' in constraint:
            for var_type, value in constraint['confirms'].items():
                self.keep_only_values(var_type, value)
        
        # Run arc consistency after applying constraint
        self.arc_consistency_ac3()
    
    def get_statistics(self):
        """Get current CSP statistics"""
        total_combinations = 1
        for domain in self.domains.values():
            total_combinations *= len(domain) if domain else 0
        
        return {
            'total_possible_combinations': total_combinations,
            'domains': {k: len(v) for k, v in self.domains.items()},
            'is_solved': all(len(v) == 1 for v in self.domains.values()),
            'is_inconsistent': any(len(v) == 0 for v in self.domains.values())
        }