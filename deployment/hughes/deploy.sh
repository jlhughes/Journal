#!/bin/bash
./build.sh -ckJjournal,hughes,u -Njournal_hughes "$@"
foam3/tools/bin/install_remote.sh -Njournal_hughes -W8100 -Hmoosehead
