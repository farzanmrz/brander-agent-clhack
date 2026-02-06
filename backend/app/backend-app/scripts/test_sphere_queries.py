#!/usr/bin/env python3
"""
Test script for sphere query generation.

Usage:
    python app/scripts/test_sphere_queries.py
    python app/scripts/test_sphere_queries.py "Your custom sphere description here"
"""

import sys
import os

# Add project root to path to import backend.app modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))

from backend.app.services.gemini_service import generate_sphere_queries


def main():
    # Default test description
    default_description = (
        "I want to build my brand as an AI developer who shares practical takes "
        "on new tools and frameworks coming out"
    )
    
    # Use command-line argument if provided, otherwise use default
    if len(sys.argv) > 1:
        description = sys.argv[1]
    else:
        description = default_description
    
    print("=" * 80)
    print("SPHERE QUERY GENERATION TEST")
    print("=" * 80)
    print(f"\nSphere Description:")
    print(f'"{description}"')
    print("\n" + "-" * 80)
    print("Generating 5 search queries...")
    print("-" * 80 + "\n")
    
    try:
        queries = generate_sphere_queries(description)
        
        print("✓ Successfully generated 5 queries:\n")
        for i, query in enumerate(queries, 1):
            print(f"{i}. {query}")
        
        print("\n" + "=" * 80)
        print("TEST PASSED ✓")
        print("=" * 80)
        
    except Exception as e:
        print(f"\n✗ ERROR: {type(e).__name__}: {e}")
        print("\n" + "=" * 80)
        print("TEST FAILED ✗")
        print("=" * 80)
        sys.exit(1)


if __name__ == "__main__":
    main()
