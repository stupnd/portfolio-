/**
 * Generated from the projects' committed eval output. Do not edit by hand.
 * traced-research-agent: eval/questions.json, eval/results/*.json
 * tinted: frontend/lib/eval-report.json (simulation, white balance on),
 *         frontend/lib/mste-report.json (MST-E photos). Values are within one
 *         Monk level as a share of all images, so refusals count as misses.
 */
export const evidence = {
  "questions": [
    {
      "id": "q001",
      "q": "What is the difference between L1 and L2 regularization?"
    },
    {
      "id": "q002",
      "q": "What is dropout and how does it prevent overfitting?"
    },
    {
      "id": "q003",
      "q": "Explain the bias-variance tradeoff in machine learning."
    },
    {
      "id": "q004",
      "q": "How does the learning rate affect neural network training?"
    },
    {
      "id": "q005",
      "q": "What is backpropagation and what role does it play in training a neural network?"
    },
    {
      "id": "q006",
      "q": "What are ensemble methods, and how does bagging work?"
    },
    {
      "id": "q007",
      "q": "What is the difference between the ROC curve and the precision-recall curve, and when should you use each?"
    },
    {
      "id": "q008",
      "q": "How do convolutional neural networks process image data differently from fully connected networks?"
    }
  ],
  "runs": [
    {
      "run": "baseline",
      "mean": 0.641,
      "scores": [
        0.33,
        0.8,
        1.0,
        0.5,
        0.5,
        0.75,
        0.75,
        0.5
      ],
      "cited": 8
    },
    {
      "run": "with-self-critique",
      "mean": 0.734,
      "scores": [
        0.5,
        0.67,
        1.0,
        0.75,
        0.7,
        0.75,
        1.0,
        0.5
      ],
      "cited": 8
    },
    {
      "run": "deeper-retrieval-strict-critique",
      "mean": 0.677,
      "scores": [
        0.33,
        0.67,
        1.0,
        0.5,
        0.67,
        0.75,
        0.75,
        0.75
      ],
      "cited": 8
    },
    {
      "run": "gentle-n5",
      "mean": 0.644,
      "scores": [
        0.5,
        0.5,
        0.9,
        0.5,
        0.5,
        0.75,
        0.75,
        0.75
      ],
      "cited": 8
    },
    {
      "run": "n3-better-synth",
      "mean": 0.664,
      "scores": [
        0.67,
        0.67,
        0.8,
        0.5,
        0.67,
        0.75,
        0.75,
        0.5
      ],
      "cited": 8
    },
    {
      "run": "targeted-fixes",
      "mean": 0.728,
      "scores": [
        0.67,
        0.7,
        1.0,
        0.75,
        0.7,
        0.75,
        0.75,
        0.5
      ],
      "cited": 8
    },
    {
      "run": "hybrid-rrf",
      "mean": 0.831,
      "scores": [
        1.0,
        0.8,
        1.0,
        0.9,
        0.7,
        0.75,
        1.0,
        0.5
      ],
      "cited": 8
    },
    {
      "run": "hybrid-rrf-idf",
      "mean": 0.74,
      "scores": [
        1.0,
        0.67,
        1.0,
        0.5,
        0.5,
        0.75,
        0.75,
        0.75
      ],
      "cited": 8
    },
    {
      "run": "hybrid-rrf-v2",
      "mean": 0.699,
      "scores": [
        0.67,
        0.67,
        1.0,
        0.5,
        0.5,
        0.75,
        0.75,
        0.75
      ],
      "cited": 8
    }
  ],
  "tinted": {
    "levels": [
      {
        "level": 1,
        "hex": "#f6ede4",
        "sim": 72,
        "real": 0,
        "realN": 159,
        "simN": 128
      },
      {
        "level": 2,
        "hex": "#f3e7db",
        "sim": 62,
        "real": 0,
        "realN": 194,
        "simN": 120
      },
      {
        "level": 3,
        "hex": "#f7ead0",
        "sim": 54,
        "real": 0,
        "realN": 101,
        "simN": 112
      },
      {
        "level": 4,
        "hex": "#eadaba",
        "sim": 68,
        "real": 3,
        "realN": 175,
        "simN": 120
      },
      {
        "level": 5,
        "hex": "#d7bd96",
        "sim": 86,
        "real": 19,
        "realN": 156,
        "simN": 120
      },
      {
        "level": 6,
        "hex": "#a07850",
        "sim": 100,
        "real": 41,
        "realN": 148,
        "simN": 120
      },
      {
        "level": 7,
        "hex": "#825c43",
        "sim": 100,
        "real": 39,
        "realN": 71,
        "simN": 120
      },
      {
        "level": 8,
        "hex": "#604134",
        "sim": 100,
        "real": 28,
        "realN": 121,
        "simN": 120
      },
      {
        "level": 9,
        "hex": "#3a312a",
        "sim": 100,
        "real": 18,
        "realN": 126,
        "simN": 120
      },
      {
        "level": 10,
        "hex": "#292420",
        "sim": 100,
        "real": 26,
        "realN": 105,
        "simN": 120
      }
    ],
    "simAll": 84,
    "realAll": 15
  }
} as const;
