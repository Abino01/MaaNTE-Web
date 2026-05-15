#!/usr/bin/env bash
#
# MaaNTE Docs Sync Script
# Sync docs from MaaNTE repository to local project
#

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
GRAY='\033[0;90m'
NC='\033[0m'

find_git_root() {
    local dir="$PWD"
    while [[ "$dir" != "/" ]]; do
        if [[ -d "$dir/.git" ]]; then
            echo "$dir"
            return
        fi
        dir="$(dirname "$dir")"
    done
    echo ""
}

PROJECT_ROOT="$(find_git_root)"
if [[ -z "$PROJECT_ROOT" ]]; then
    echo -e "${RED}Error: Could not find project root (.git directory).${NC}"
    exit 1
fi
cd "$PROJECT_ROOT"

TEMP_DIR="$PROJECT_ROOT/MaaNTE-temp"
DOCS_DIR="$PROJECT_ROOT/docs"

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}MaaNTE Docs Sync Script${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: git command not found. Please install Git first.${NC}"
    exit 1
fi

if [ -d "$TEMP_DIR" ]; then
    echo -e "${YELLOW}Updating MaaNTE repository...${NC}"
    cd "$TEMP_DIR"
    git fetch origin
    git reset --hard origin/main
    echo -e "${GREEN}MaaNTE repository updated successfully${NC}"
    cd "$PROJECT_ROOT"
else
    echo -e "${YELLOW}Cloning MaaNTE repository...${NC}"
    git clone https://github.com/1bananachicken/MaaNTE.git "$TEMP_DIR"
    echo -e "${GREEN}MaaNTE repository cloned successfully${NC}"
fi

echo ""
echo -e "${YELLOW}Start syncing docs...${NC}"

mkdir -p "$DOCS_DIR/zh_cn"

SOURCE_README="$TEMP_DIR/docs/README.md"
TARGET_README="$DOCS_DIR/README.md"

if [ -f "$SOURCE_README" ]; then
    echo -e "  -> Sync docs/README.md"
    cp "$SOURCE_README" "$TARGET_README"
    echo -e "    ${GREEN}Done${NC}"
else
    echo -e "    ${YELLOW}Source file not found: $SOURCE_README${NC}"
fi

SOURCE_ZH_CN="$TEMP_DIR/docs/zh_cn/"
TARGET_ZH_CN="$DOCS_DIR/zh_cn/"

if [ -d "$SOURCE_ZH_CN" ]; then
    echo -e "  -> Sync docs/zh_cn/"
    # Preserve site-specific README.md files
    for f in "$TARGET_ZH_CN"README.md "$TARGET_ZH_CN"introduction/README.md "$TARGET_ZH_CN"develop/README.md; do
        if [ -f "$f" ]; then
            cp "$f" "$f.bak"
        fi
    done
    rm -rf "$TARGET_ZH_CN"
    cp -r "$SOURCE_ZH_CN" "$TARGET_ZH_CN"
    # Restore site-specific README.md files
    for f in "$TARGET_ZH_CN"README.md.bak "$TARGET_ZH_CN"introduction/README.md.bak "$TARGET_ZH_CN"develop/README.md.bak; do
        if [ -f "$f" ]; then
            mv "$f" "${f%.bak}"
        fi
    done
    echo -e "    ${GREEN}Done${NC}"
else
    echo -e "    ${YELLOW}Source directory not found: $SOURCE_ZH_CN${NC}"
fi

echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "${GREEN}Sync completed!${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""
echo -e "${GRAY}Note: Temporary files are in the MaaNTE-temp directory and can be deleted anytime.${NC}"
