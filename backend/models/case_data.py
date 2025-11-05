"""
Case data: suspects, weapons, locations, evidence, and solution
"""

class CaseData:
    def __init__(self):
        self.solution = {
            'suspect': 'Chef',
            'weapon': 'Poison',
            'location': 'Kitchen'
        }
        
        self.domains = {
            'suspect': ['Butler', 'Chef', 'Gardener'],
            'weapon': ['Knife', 'Poison', 'Rope'],
            'location': ['Kitchen', 'Library', 'Garden']
        }
        
        self.evidence = [
            {
                'id': 1,
                'action': 'Interview Butler',
                'clue': 'Butler was in the garden from 9-11 PM with witnesses',
                'constraint': {
                    'type': 'alibi',
                    'eliminates': {'suspect': ['Butler']}
                },
                'cost': 1,
                'discovered': False
            },
            {
                'id': 2,
                'action': 'Check Security Footage',
                'clue': 'Gardener left the mansion at 9:30 PM',
                'constraint': {
                    'type': 'alibi',
                    'eliminates': {'suspect': ['Gardener']}
                },
                'cost': 1,
                'discovered': False
            },
            {
                'id': 3,
                'action': 'Analyze Wine Glass',
                'clue': 'Poison residue detected in the wine glass',
                'constraint': {
                    'type': 'forensic',
                    'eliminates': {'weapon': ['Knife', 'Rope']}
                },
                'cost': 2,
                'discovered': False
            },
            {
                'id': 4,
                'action': 'Search Kitchen',
                'clue': "Chef's fingerprints found on poison bottle in kitchen",
                'constraint': {
                    'type': 'forensic',
                    'confirms': {'suspect': 'Chef', 'location': 'Kitchen'}
                },
                'cost': 2,
                'discovered': False
            },
            {
                'id': 5,
                'action': 'Check Library Records',
                'clue': 'No signs of struggle or evidence in library',
                'constraint': {
                    'type': 'location',
                    'eliminates': {'location': ['Library']}
                },
                'cost': 1,
                'discovered': False
            },
            {
                'id': 6,
                'action': 'Examine Garden',
                'clue': 'Garden shows no evidence of crime',
                'constraint': {
                    'type': 'location',
                    'eliminates': {'location': ['Garden']}
                },
                'cost': 1,
                'discovered': False
            }
        ]
        
    def get_available_actions(self):
        """Return list of actions that haven't been discovered yet"""
        return [e for e in self.evidence if not e['discovered']]
    
    def get_discovered_evidence(self):
        """Return list of discovered evidence"""
        return [e for e in self.evidence if e['discovered']]
    
    def discover_evidence(self, evidence_id):
        """Mark evidence as discovered"""
        for e in self.evidence:
            if e['id'] == evidence_id:
                e['discovered'] = True
                return e
        return None