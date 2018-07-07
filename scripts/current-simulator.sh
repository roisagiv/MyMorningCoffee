#!/usr/bin/env bash
xcrun simctl list devices | grep Booted | sed 's/^ *//;s/([A-F0-9]\{8\}.*//;s/ *$//' | head -n1
