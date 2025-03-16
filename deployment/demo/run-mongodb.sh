#!/bin/bash
./build.sh -Ppom,foam-mongodb/pom-all -Jjournal,demo -aJ../foam3/deployment/https -Njournal_demo -W8100 "$@"
