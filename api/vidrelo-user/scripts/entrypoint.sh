#!/bin/sh

(npm run build && npm run typeorm migration:run && npm run start:prod)
