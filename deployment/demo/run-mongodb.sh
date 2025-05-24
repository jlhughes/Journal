#!/bin/bash
./build.sh -Ppom,foam-mongodb/pom-all -Jjournal,demo -aJhttps -Njournal_demo -W8100 "$@"
