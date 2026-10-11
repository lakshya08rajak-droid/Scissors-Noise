#!/bin/sh
set -e

TOOLS_DIR="/Users/lakshya/.gemini/antigravity/brain/2801b2b5-db5c-4f9f-a5c8-3a08044b73bb/scratch/tools"
export GIT_EXEC_PATH="$TOOLS_DIR/git/libexec/git-core"
export GIT_SSL_CAINFO="/etc/ssl/cert.pem"
export GH_CONFIG_DIR="$TOOLS_DIR/gh-config"
export PATH="$TOOLS_DIR/git/bin:$TOOLS_DIR/gh_2.102.0_macOS_arm64/bin:$PATH"

REPO_URL="https://github.com/lakshya08rajak-droid/Scissors-Noise.git"

if ! gh auth status >/dev/null 2>&1; then
  echo "Starting GitHub browser authentication..."
  gh auth login --hostname github.com --git-protocol https --web --insecure-storage
fi

gh auth setup-git --hostname github.com
git push -u origin main
echo "Successfully pushed all 50 files to $REPO_URL"
