#!/bin/bash
./build.sh -ckJjournal,hughes,../foam3/deployment/https -Njournal_hughes "$@"
foam3/tools/bin/install_remote.sh -Njournal_hughes -W8100 -Hmoosehead
