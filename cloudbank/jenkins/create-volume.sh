#!/bin/bash

DISPLAY_NAME=$1
SOURCE_VOLUME_OCID=$2

SIZE_GB=1024
RAW_OUTPUT_FILE=$(mktemp)
JSON_FILE=$(mktemp)

oci bv volume create \
    --source-volume-id "$SOURCE_VOLUME_OCID" \
    --size-in-gbs $SIZE_GB \
    --display-name "$DISPLAY_NAME" \
    --wait-for-state AVAILABLE \
    --wait-for-state FAULTY \
    --wait-for-state TERMINATED \
    --wait-interval-seconds 10 > "$RAW_OUTPUT_FILE" 2>&1

if [ $? -ne 0 ]; then
    echo "Volume creation failed or timed out"
    cat "$RAW_OUTPUT_FILE"
    rm -f "$RAW_OUTPUT_FILE" "$JSON_FILE"
    exit 1
fi
tail -n +2 "$RAW_OUTPUT_FILE" > "$JSON_FILE"

FINAL_STATE=$(jq -r '.data."lifecycle-state"' "$JSON_FILE")
VOLUME_OCID=$(jq -r '.data.id' "$JSON_FILE")

rm -f "$RAW_OUTPUT_FILE" "$JSON_FILE"

if [[ "$FINAL_STATE" != "AVAILABLE" ]]; then
    echo "Volume reached terminal state: $FINAL_STATE"
    exit 1
fi

echo "Volume is AVAILABLE"
echo "VOLUME_OCID=${VOLUME_OCID}" > volume.env