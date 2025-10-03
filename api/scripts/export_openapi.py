"""Export OpenAPI schema from FastAPI application to a JSON file."""

import json
import sys
from pathlib import Path

# Add parent directory to path to import main
sys.path.insert(0, str(Path(__file__).parent.parent))

from main import app


def export_openapi_schema():
    """Export the OpenAPI schema to client/src/types/openapi.json."""
    openapi_schema = app.openapi()

    # Define the output path
    project_root = Path(__file__).parent.parent.parent
    output_path = project_root / "client" / "src" / "types" / "openapi.json"

    # Create the directory if it doesn't exist
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Write the schema to file
    with output_path.open("w") as f:
        json.dump(openapi_schema, f, indent=2)

    print(f"✅ OpenAPI schema exported to {output_path}")


if __name__ == "__main__":
    export_openapi_schema()
