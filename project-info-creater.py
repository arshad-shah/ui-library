import os
import json
import subprocess
from pathlib import Path

def get_git_info():
    """Gather information from git repository."""
    git_info = {}
    
    try:
        # Get remote URL
        git_info['remote_url'] = subprocess.getoutput('git config --get remote.origin.url')
        
        # Get current branch
        git_info['current_branch'] = subprocess.getoutput('git rev-parse --abbrev-ref HEAD')
        
        # Get latest tag
        git_info['latest_tag'] = subprocess.getoutput('git describe --tags --abbrev=0')
        
        # Get contributors
        git_info['contributors'] = subprocess.getoutput('git shortlog -sn --all')
    except Exception as e:
        print(f"Warning: Some git information couldn't be retrieved: {e}")
    
    return git_info

def analyze_dependencies():
    """Analyze project dependencies."""
    dependencies = {
        'python': [],
        'node': [],
        'other': []
    }
    
    # Check for Python dependencies
    if os.path.exists('requirements.txt'):
        with open('requirements.txt', 'r') as f:
            dependencies['python'] = f.read().splitlines()
    
    # Check for Node.js dependencies
    if os.path.exists('package.json'):
        with open('package.json', 'r') as f:
            try:
                package_json = json.load(f)
                dependencies['node'] = list(package_json.get('dependencies', {}).keys())
            except json.JSONDecodeError:
                print("Warning: Could not parse package.json")
    
    return dependencies

def scan_directory():
    """Scan directory structure and identify key files."""
    structure = {
        'directories': [],
        'key_files': [],
        'test_files': [],
        'doc_files': []
    }
    
    excluded = {'.git', 'node_modules', '__pycache__', 'venv', '.env'}
    
    for root, dirs, files in os.walk('.', topdown=True):
        # Skip excluded directories
        dirs[:] = [d for d in dirs if d not in excluded]
        
        rel_path = os.path.relpath(root, '.')
        if rel_path != '.':
            structure['directories'].append(rel_path)
        
        for file in files:
            file_path = os.path.join(rel_path, file)
            
            # Identify key files
            if file in ['README.md', 'setup.py', 'requirements.txt', 'package.json', 'Dockerfile']:
                structure['key_files'].append(file_path)
            
            # Identify test files
            elif 'test' in file.lower() and file.endswith('.py'):
                structure['test_files'].append(file_path)
            
            # Identify documentation files
            elif file.endswith(('.md', '.rst', '.txt')):
                structure['doc_files'].append(file_path)
    
    return structure

def generate_project_info():
    """Generate comprehensive project information."""
    project_info = {
        'git_info': get_git_info(),
        'dependencies': analyze_dependencies(),
        'structure': scan_directory()
    }
    
    # Save to JSON file
    with open('project_info.json', 'w') as f:
        json.dump(project_info, f, indent=2)
    
    print("\nProject information has been collected and saved to 'project_info.json'")
    print("\nPlease provide this file along with any additional context when requesting the README generation.")
    
    # Print summary
    print("\nSummary of collected information:")
    print(f"- Found {len(project_info['dependencies']['python'])} Python dependencies")
    print(f"- Found {len(project_info['dependencies']['node'])} Node.js dependencies")
    print(f"- Scanned {len(project_info['structure']['directories'])} directories")
    print(f"- Identified {len(project_info['structure']['key_files'])} key files")
    print(f"- Found {len(project_info['structure']['test_files'])} test files")

if __name__ == "__main__":
    generate_project_info()