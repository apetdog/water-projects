#!/bin/bash

# Directory setup
BASE_DIR="/Users/logeast/Documents/apetdog/oriens-coding-local/timeline/20251209-iot-admin"
DIST_DIR="$BASE_DIR/dist"

cd "$BASE_DIR" || exit 1

# Create dist directory
mkdir -p "$DIST_DIR"

echo "Preparing to copy source files to $DIST_DIR..."

# Check if git is available and this is a git repo
if command -v git &> /dev/null && git rev-parse --is-inside-work-tree &> /dev/null; then
    echo "Git repository detected. Using git to identify source files..."
    
    # Use rsync with files list from git
    # -c: cached (tracked)
    # -o: others (untracked)
    # --exclude-standard: apply .gitignore rules
    # This ensures we get exactly what git sees, including new files, but excluding ignored ones.
    
    # We use a temporary file to avoid pipe issues with xargs or complex shell substitutions
    # We exclude .git folder itself explicitly just in case, though ls-files usually doesn't list .git internals
    git ls-files -c -o --exclude-standard > .git_files_list
    
    # Check if list is empty
    if [ ! -s .git_files_list ]; then
        echo "No files found to copy."
        rm .git_files_list
        exit 1
    fi
    
    # rsync using the list
    # --files-from: read list of files to transfer
    # -a: archive
    # -v: verbose
    # --progress: show progress
    rsync -av --progress --files-from=.git_files_list . "$DIST_DIR/"
    
    rm .git_files_list
else
    echo "Not a git repository or git not found. Falling back to rsync with .gitignore..."
    
    rsync -av --progress \
        --exclude-from=.gitignore \
        --exclude='.git' \
        --exclude='dist' \
        --exclude='node_modules' \
        . "$DIST_DIR/"
fi

echo "Copy completed successfully."
