#!/usr/bin/env bash
# Prépare le modèle de voix Kokoro (licence Apache 2.0) dans scripts/audio/model/ (ignoré par git).
# Tout vient du registre npm et de PyPI. Usage : bash scripts/audio/setup.sh
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p model && cd model
if [ ! -f model_quantized.onnx ]; then
  npm pack kokoro-q8-shards@1.0.0 kokoro-local-runtime@0.1.0 --silent
  mkdir -p shards runtime
  tar xzf kokoro-q8-shards-1.0.0.tgz -C shards
  tar xzf kokoro-local-runtime-0.1.0.tgz -C runtime
  cat shards/package/kokoro-q8.part{0..5}.bin > model_quantized.onnx
  echo "fbae9257e1e05ffc727e951ef9b9c98418e6d79f1c9b6b13bd59f5c9028a1478  model_quantized.onnx" | sha256sum -c -
  cp runtime/package/voices/*.bin .
  rm -rf shards runtime ./*.tgz
fi
if [ ! -d venv ]; then
  python3 -m venv venv
  ./venv/bin/pip install -q kokoro-onnx==0.6.1 soundfile
fi
echo "Modèle prêt. Ensuite : npm run audio:texts && scripts/audio/model/venv/bin/python scripts/audio/generate.py"
