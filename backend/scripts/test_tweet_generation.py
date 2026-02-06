#!/usr/bin/env python3
"""
Test script for tweet generation from article content.

This script tests the generate_tweets_from_queries function with sample data.
"""

import sys
import os

# Add parent directory to path to import app modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from app.services.gemini_service import QueryContent, generate_tweets_from_queries


def test_tweet_generation():
    """Test tweet generation with sample article content."""
    
    # Sample sphere description
    sphere_description = "I want to build my brand as an AI developer sharing practical takes on new tools and frameworks"
    
    # Sample queries with mock article content
    queries = [
        QueryContent(
            query="new AI developer tools 2026",
            content="""
            Recent developments in AI tooling have revolutionized how developers build applications. 
            Tools like Cursor AI and GitHub Copilot have integrated advanced code completion features 
            that understand project context better than ever before. The latest updates in 2026 include 
            multi-file editing capabilities and real-time collaboration features that make pair programming 
            with AI assistants more natural. Developers report 40% faster prototyping times when using 
            these modern AI coding assistants compared to traditional IDEs.
            
            Another major development is the emergence of AI-powered debugging tools that can analyze 
            stack traces and suggest fixes automatically. Tools like DeepCode and Tabnine have expanded 
            their capabilities to include security vulnerability detection and performance optimization 
            suggestions. The integration of large language models into development workflows is becoming 
            standard practice across the industry.
            """
        ),
        QueryContent(
            query="LLM framework comparison practical guide",
            content="""
            When choosing an LLM framework for production applications, developers face several options. 
            LangChain offers extensive tooling for building complex agent workflows but comes with a 
            steeper learning curve. LlamaIndex specializes in retrieval-augmented generation (RAG) 
            applications and provides excellent document indexing capabilities out of the box.
            
            For simpler use cases, direct API integration with providers like OpenAI or Anthropic might 
            be sufficient. The trade-off is between abstraction convenience and fine-grained control. 
            Recent benchmarks show that lighter-weight solutions can reduce latency by 30-50% compared 
            to full framework implementations, but at the cost of having to build more infrastructure 
            yourself. The choice ultimately depends on your team's expertise and project requirements.
            """
        )
    ]
    
    print("Testing tweet generation...")
    print(f"Sphere: {sphere_description}")
    print(f"Number of queries: {len(queries)}\n")
    
    try:
        # Generate tweets
        response = generate_tweets_from_queries(queries, sphere_description)
        
        print(f"✓ Successfully generated {len(response.tweets)} tweets\n")
        
        # Display results
        for i, tweet in enumerate(response.tweets, 1):
            print(f"Tweet {i} (Query: {tweet.query}):")
            print(f"  {tweet.tweet}")
            print(f"  Character count: {len(tweet.tweet)}")
            print()
        
        return True
        
    except Exception as e:
        print(f"✗ Error generating tweets: {str(e)}")
        return False


if __name__ == "__main__":
    success = test_tweet_generation()
    exit(0 if success else 1)