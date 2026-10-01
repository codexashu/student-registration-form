#!/usr/bin/env bash
# Script to launch local Jenkins server on port 8080
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
JENKINS_WAR="/Users/ashutoshpandey/.gemini/antigravity/scratch/jenkins.war"
JENKINS_HOME="/Users/ashutoshpandey/.gemini/antigravity/scratch/jenkins_home"

echo "=========================================="
echo " Starting Local Jenkins Server on Port 8080"
echo "=========================================="
echo "Jenkins Home: $JENKINS_HOME"
echo "Jenkins WAR:  $JENKINS_WAR"
echo "Dashboard:    http://localhost:8080"
echo "=========================================="

mkdir -p "$JENKINS_HOME"
JENKINS_HOME="$JENKINS_HOME" java -jar "$JENKINS_WAR" --httpPort=8080 --enable-future-java
