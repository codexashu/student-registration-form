#!/usr/bin/env bash
set -e

echo "=========================================="
echo " Starting Automated HTML Validation Tests "
echo "=========================================="

# Check if Python 3 is available
if command -v python3 &>/dev/null; then
    echo "[+] Running Python Unit Tests..."
    python3 -m unittest discover -s tests -p "test_*.py" -v
    PYTHON_STATUS=$?
else
    echo "[!] Warning: python3 not found, skipping python tests."
    PYTHON_STATUS=0
fi

# Check if Node is available
if command -v node &>/dev/null; then
    echo ""
    echo "[+] Running Node.js Structure Tests..."
    node tests/test_html.js
    NODE_STATUS=$?
else
    echo "[!] Warning: node not found, skipping node tests."
    NODE_STATUS=0
fi

if [ $PYTHON_STATUS -eq 0 ] && [ $NODE_STATUS -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo " ALL TESTS PASSED SUCCESSFULLY!          "
    echo "=========================================="
    exit 0
else
    echo ""
    echo "=========================================="
    echo " TESTS FAILED!                           "
    echo "=========================================="
    exit 1
fi
