"""
Single entrypoint to run backend on port 3000 (or PORT from env for Render).
Usage: python run.py
"""
import os
import subprocess
import sys

def main():
    port = os.environ.get("PORT", "3000")
    try:
        subprocess.run(
            [
                sys.executable, "-m", "uvicorn",
                "main:app",
                "--host", "0.0.0.0",
                "--port", str(port),
            ],
            check=True,
        )
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()
