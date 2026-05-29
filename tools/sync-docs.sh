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
UPSTREAM_BRANCH="dev"

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
    git fetch origin "$UPSTREAM_BRANCH"
    git reset --hard "origin/$UPSTREAM_BRANCH"
    echo -e "${GREEN}MaaNTE repository updated successfully${NC}"
    cd "$PROJECT_ROOT"
else
    echo -e "${YELLOW}Cloning MaaNTE repository...${NC}"
    git clone --branch "$UPSTREAM_BRANCH" https://github.com/1bananachicken/MaaNTE.git "$TEMP_DIR"
    echo -e "${GREEN}MaaNTE repository cloned successfully${NC}"
fi

echo ""
echo -e "${YELLOW}Start syncing docs...${NC}"

sync_locale_docs() {
    local source_dir="$1"
    local target_dir="$2"
    local label="$3"

    if [ ! -d "$source_dir" ]; then
        echo -e "    ${YELLOW}Source directory not found: $source_dir (skipping $label)${NC}"
        return
    fi

    echo -e "  -> Sync $label ($source_dir -> $target_dir)"

    # Preserve site-specific README.md files
    local preserved=()
    while IFS= read -r -d '' f; do
        if [ -f "$f" ] && [[ "$(basename "$f")" == "README.md" ]]; then
            cp "$f" "$f.bak"
            preserved+=("$f")
        fi
    done < <(find "$target_dir" -name "README.md" -print0 2>/dev/null || true)

    mkdir -p "$(dirname "$target_dir")"
    rm -rf "$target_dir"
    cp -r "$source_dir" "$target_dir"

    # Restore preserved site-specific README.md files
    for f in "${preserved[@]}"; do
        if [ -f "$f.bak" ]; then
            mv "$f.bak" "$f"
        fi
    done

    echo -e "    ${GREEN}Done${NC}"
}

# zh-CN
sync_locale_docs "$TEMP_DIR/docs/zh_cn/" "$DOCS_DIR/zh_cn/" "zh_cn"

# English (upstream uses "eng", site uses "en_us")
sync_locale_docs "$TEMP_DIR/docs/eng/" "$DOCS_DIR/en_us/" "en_us"

# Japanese (upstream uses "jp", site uses "ja_jp")
sync_locale_docs "$TEMP_DIR/docs/jp/" "$DOCS_DIR/ja_jp/" "ja_jp"

# Sync top-level README as home page if it exists
SOURCE_README="$TEMP_DIR/docs/README.md"
TARGET_README="$DOCS_DIR/README.md"
if [ -f "$SOURCE_README" ]; then
    echo -e "  -> Sync homepage (docs/README.md)"
    cp "$SOURCE_README" "$TARGET_README"
    echo -e "    ${GREEN}Done${NC}"
fi

echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "${GREEN}Sync completed!${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""
echo -e "${GRAY}Note: Temporary files are in the MaaNTE-temp directory and can be deleted anytime.${NC}"
