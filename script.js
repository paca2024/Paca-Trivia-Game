// Game state
const gameState = {
    currentQuestion: 0,
    score: 0,
    timeLeft: 15,
    timer: null,
    correctAnswers: 0,
    isAnswered: false,
    lives: 5,
    currentQuestions: [] // Array to hold current game's questions
};

// Constants
const QUESTIONS_PER_GAME = 20; // Number of questions per game

// Sample questions (100 questions covering various crypto topics)
const questions = [
    // Blockchain Fundamentals
    {
        question: "Which blockchain is known for its smart contract functionality?",
        answers: ["Bitcoin", "Ethereum", "Dogecoin"],
        correct: 1,
        explanation: "Ethereum was the first blockchain to introduce smart contracts, enabling programmable transactions and decentralized applications (dApps)."
    },
    {
        question: "What consensus mechanism does Bitcoin use?",
        answers: ["Proof of Stake", "Proof of Work", "Proof of Authority"],
        correct: 1,
        explanation: "Bitcoin uses Proof of Work (PoW) where miners compete to solve complex mathematical problems to validate transactions."
    },
    {
        question: "What type of cryptocurrency exchange allows direct peer-to-peer trading?",
        answers: ["Centralized Exchange", "Decentralized Exchange", "Crypto ATM"],
        correct: 1,
        explanation: "Decentralized Exchanges (DEX) enable direct peer-to-peer trading without an intermediary, using smart contracts."
    },
    {
        question: "What is staking in cryptocurrency?",
        answers: ["Mining new coins", "Locking coins to earn rewards", "Selling coins for profit"],
        correct: 1,
        explanation: "Staking involves locking up cryptocurrency to support network operations and earn rewards in return."
    },
    {
        question: "Who created Bitcoin?",
        answers: ["Vitalik Buterin", "Satoshi Nakamoto", "Charlie Lee"],
        correct: 1,
        explanation: "Satoshi Nakamoto is the pseudonymous creator of Bitcoin, whose true identity remains unknown."
    },
    {
        question: "What is the maximum supply of Bitcoin?",
        answers: ["21 Million", "100 Million", "Unlimited"],
        correct: 0,
        explanation: "Bitcoin has a fixed maximum supply of 21 million coins, making it a deflationary currency."
    },
    {
        question: "What is a blockchain?",
        answers: ["A centralized database", "A distributed ledger", "A private server"],
        correct: 1,
        explanation: "A blockchain is a distributed ledger that records transactions across a network of computers."
    },
    {
        question: "What is a private key in cryptocurrency?",
        answers: ["A password for exchanges", "A secret code to access funds", "A public wallet address"],
        correct: 1,
        explanation: "A private key is a secret code that allows you to access and transfer your cryptocurrency."
    },
    {
        question: "What is a smart contract?",
        answers: ["A legal document", "Self-executing code on blockchain", "A trading agreement"],
        correct: 1,
        explanation: "Smart contracts are self-executing contracts with terms directly written into code on the blockchain."
    },
    {
        question: "What is a gas fee in Ethereum?",
        answers: ["Transaction cost", "Mining reward", "Staking reward"],
        correct: 0,
        explanation: "Gas fees are transaction costs paid to process transactions on the Ethereum network."
    },
    // DeFi and NFTs
    {
        question: "What does DeFi stand for?",
        answers: ["Digital Finance", "Decentralized Finance", "Direct Finance"],
        correct: 1,
        explanation: "DeFi stands for Decentralized Finance, representing financial services on the blockchain."
    },
    {
        question: "What is yield farming?",
        answers: ["Mining crypto", "Lending crypto for returns", "Trading crypto"],
        correct: 1,
        explanation: "Yield farming involves lending or staking crypto assets to generate returns."
    },
    {
        question: "What is an NFT?",
        answers: ["Non-Fungible Token", "New Financial Technology", "Network Fund Transfer"],
        correct: 0,
        explanation: "NFT stands for Non-Fungible Token, representing unique digital assets on the blockchain."
    },
    {
        question: "What is liquidity mining?",
        answers: ["Mining new tokens", "Providing liquidity for rewards", "Trading tokens"],
        correct: 1,
        explanation: "Liquidity mining involves providing assets to liquidity pools in exchange for rewards."
    },
    // Crypto Exchanges and Trading
    {
        question: "What is a market order?",
        answers: ["Limit price order", "Immediate buy/sell at market price", "Stop-loss order"],
        correct: 1,
        explanation: "A market order is executed immediately at the current market price."
    },
    {
        question: "What is a cold wallet?",
        answers: ["Online wallet", "Offline storage device", "Exchange wallet"],
        correct: 1,
        explanation: "A cold wallet is an offline storage device for cryptocurrency, providing enhanced security."
    },
    // Continue with more questions...
    {
        question: "What is a block in blockchain?",
        answers: ["A transaction", "A collection of transactions", "A wallet address"],
        correct: 1,
        explanation: "A block is a collection of transactions that are bundled together and added to the blockchain."
    },
    {
        question: "What is a fork in blockchain?",
        answers: ["A software update", "A split in the blockchain", "A new cryptocurrency"],
        correct: 1,
        explanation: "A fork is a split in the blockchain that creates two separate chains."
    },
    {
        question: "What is mining difficulty?",
        answers: ["Hash rate", "Complexity of mining puzzles", "Network speed"],
        correct: 1,
        explanation: "Mining difficulty refers to how hard it is to solve the mathematical puzzle required to mine a block."
    },
    {
        question: "What is a wallet address?",
        answers: ["Private key", "Public key hash", "Transaction ID"],
        correct: 1,
        explanation: "A wallet address is a public key hash used to receive cryptocurrency."
    },
    // Add more questions about different blockchain platforms
    {
        question: "What is Solana known for?",
        answers: ["High fees", "High speed and low fees", "Smart contracts only"],
        correct: 1,
        explanation: "Solana is known for its high-speed transactions and low fees."
    },
    {
        question: "What is Cardano's native token?",
        answers: ["CARD", "ADA", "CDN"],
        correct: 1,
        explanation: "ADA is Cardano's native cryptocurrency, named after Ada Lovelace."
    },
    // Questions about crypto security
    {
        question: "What is a 51% attack?",
        answers: ["Network upgrade", "Majority control attack", "Price manipulation"],
        correct: 1,
        explanation: "A 51% attack occurs when an entity controls majority of network hash power."
    },
    {
        question: "What is two-factor authentication (2FA)?",
        answers: ["Double password", "Additional security step", "Backup phrase"],
        correct: 1,
        explanation: "2FA adds an extra layer of security beyond just a password."
    },
    // Questions about crypto history
    {
        question: "When was Bitcoin created?",
        answers: ["2007", "2009", "2011"],
        correct: 1,
        explanation: "Bitcoin was created in 2009 following the publication of the whitepaper in 2008."
    },
    {
        question: "What was the first NFT?",
        answers: ["CryptoPunks", "Quantum", "Bored Ape"],
        correct: 1,
        explanation: "Quantum, created by Kevin McCoy in 2014, is considered the first NFT."
    },
    // Questions about DeFi Protocols
    {
        question: "What is Uniswap?",
        answers: ["Lending platform", "Decentralized exchange", "NFT marketplace"],
        correct: 1,
        explanation: "Uniswap is a popular decentralized exchange protocol on Ethereum."
    },
    {
        question: "What is Aave?",
        answers: ["DEX protocol", "Lending protocol", "Gaming platform"],
        correct: 1,
        explanation: "Aave is a decentralized lending protocol where users can lend and borrow crypto assets."
    },
    {
        question: "What is an oracle in blockchain?",
        answers: ["Smart contract", "External data provider", "Governance token"],
        correct: 1,
        explanation: "Oracles provide external data to blockchain networks and smart contracts."
    },
    {
        question: "What is Chainlink?",
        answers: ["Blockchain platform", "Oracle network", "Exchange protocol"],
        correct: 1,
        explanation: "Chainlink is a decentralized oracle network providing external data to smart contracts."
    },
    // Layer 2 Solutions
    {
        question: "What is a Layer 2 solution?",
        answers: ["New blockchain", "Scaling solution", "Mining protocol"],
        correct: 1,
        explanation: "Layer 2 solutions are scaling solutions built on top of existing blockchains."
    },
    {
        question: "What is Polygon?",
        answers: ["Layer 1 blockchain", "Layer 2 scaling solution", "Oracle network"],
        correct: 1,
        explanation: "Polygon is a Layer 2 scaling solution for Ethereum."
    },
    // Crypto Mining
    {
        question: "What is a mining pool?",
        answers: ["Solo mining", "Group of miners", "Trading platform"],
        correct: 1,
        explanation: "A mining pool is a group of miners who combine their computational resources."
    },
    {
        question: "What is halving in Bitcoin?",
        answers: ["Price reduction", "Mining reward reduction", "Network split"],
        correct: 1,
        explanation: "Halving is when Bitcoin mining rewards are cut in half every 210,000 blocks."
    },
    // Crypto Regulations
    {
        question: "What is KYC?",
        answers: ["Trading strategy", "Identity verification", "Mining protocol"],
        correct: 1,
        explanation: "KYC (Know Your Customer) is an identity verification process required by many exchanges."
    },
    {
        question: "What is AML in crypto?",
        answers: ["Trading bot", "Anti-Money Laundering", "Mining algorithm"],
        correct: 1,
        explanation: "AML refers to Anti-Money Laundering regulations in cryptocurrency."
    },
    // Crypto Storage
    {
        question: "What is a seed phrase?",
        answers: ["Password", "Recovery words", "Username"],
        correct: 1,
        explanation: "A seed phrase is a set of words used to recover cryptocurrency wallets."
    },
    {
        question: "What is a hardware wallet?",
        answers: ["Mobile app", "Physical device", "Web wallet"],
        correct: 1,
        explanation: "A hardware wallet is a physical device for secure crypto storage."
    },
    // Crypto Trading
    {
        question: "What is HODL?",
        answers: ["Trading strategy", "Misspelling of 'hold'", "Exchange name"],
        correct: 1,
        explanation: "HODL is a misspelling of 'hold' that became a popular term for holding crypto long-term."
    },
    {
        question: "What is a bull market?",
        answers: ["Falling prices", "Rising prices", "Stable prices"],
        correct: 1,
        explanation: "A bull market is characterized by rising prices and optimistic sentiment."
    },
    // Blockchain Technology
    {
        question: "What is a node in blockchain?",
        answers: ["Transaction", "Network participant", "Smart contract"],
        correct: 1,
        explanation: "A node is a participant in the blockchain network that maintains a copy of the blockchain."
    },
    {
        question: "What is a hash function?",
        answers: ["Encryption tool", "One-way function", "Smart contract"],
        correct: 1,
        explanation: "A hash function converts input data into a fixed-size output string."
    },
    // More about NFTs
    {
        question: "What is minting an NFT?",
        answers: ["Buying NFT", "Creating NFT", "Trading NFT"],
        correct: 1,
        explanation: "Minting is the process of creating a new NFT on the blockchain."
    },
    {
        question: "What is an NFT marketplace?",
        answers: ["Mining pool", "Trading platform for NFTs", "Wallet provider"],
        correct: 1,
        explanation: "An NFT marketplace is a platform for buying, selling, and trading NFTs."
    },
    // Emerging Technologies
    {
        question: "What is Web3?",
        answers: ["Website", "Decentralized internet", "Search engine"],
        correct: 1,
        explanation: "Web3 refers to a decentralized version of the internet built on blockchain technology."
    },
    {
        question: "What is a DAO?",
        answers: ["Trading bot", "Decentralized organization", "Mining pool"],
        correct: 1,
        explanation: "A DAO is a Decentralized Autonomous Organization governed by smart contracts and token holders."
    },
    // Privacy and Security
    {
        question: "What is a privacy coin?",
        answers: ["Bitcoin fork", "Anonymous cryptocurrency", "Stablecoin"],
        correct: 1,
        explanation: "Privacy coins are cryptocurrencies designed to keep transactions private and anonymous."
    },
    {
        question: "What is Monero known for?",
        answers: ["Smart contracts", "Privacy features", "NFTs"],
        correct: 1,
        explanation: "Monero is known for its strong privacy features and anonymous transactions."
    },
    // Crypto Economics
    {
        question: "What is tokenomics?",
        answers: ["Token trading", "Token economics", "Token storage"],
        correct: 1,
        explanation: "Tokenomics refers to the economic model and supply/demand mechanics of a cryptocurrency."
    },
    {
        question: "What is market capitalization?",
        answers: ["Token price", "Total value of all tokens", "Trading volume"],
        correct: 1,
        explanation: "Market capitalization is the total value of all tokens in circulation."
    },
    // Blockchain Governance
    {
        question: "What is on-chain governance?",
        answers: ["Exchange rules", "Blockchain decision making", "Trading protocol"],
        correct: 1,
        explanation: "On-chain governance allows token holders to vote on protocol changes directly on the blockchain."
    },
    {
        question: "What is a governance token?",
        answers: ["Payment token", "Voting rights token", "Security token"],
        correct: 1,
        explanation: "Governance tokens give holders voting rights in a protocol's decision-making process."
    },
    // Advanced Trading
    {
        question: "What is leverage trading?",
        answers: ["Regular trading", "Borrowed funds trading", "Spot trading"],
        correct: 1,
        explanation: "Leverage trading involves trading with borrowed funds to amplify potential returns."
    },
    {
        question: "What is a futures contract?",
        answers: ["Spot trade", "Agreement to trade later", "Instant trade"],
        correct: 1,
        explanation: "A futures contract is an agreement to buy or sell an asset at a future date."
    },
    // Blockchain Development
    {
        question: "What is Solidity?",
        answers: ["Database", "Programming language", "Blockchain"],
        correct: 1,
        explanation: "Solidity is the primary programming language for Ethereum smart contracts."
    },
    {
        question: "What is a dApp?",
        answers: ["Mobile app", "Decentralized application", "Website"],
        correct: 1,
        explanation: "A dApp is a decentralized application that runs on a blockchain network."
    },
    // Crypto Payments
    {
        question: "What is Lightning Network?",
        answers: ["Altcoin", "Bitcoin scaling solution", "Exchange"],
        correct: 1,
        explanation: "Lightning Network is a Layer 2 scaling solution for Bitcoin enabling fast, cheap transactions."
    },
    {
        question: "What is a payment channel?",
        answers: ["Bank transfer", "Off-chain transaction path", "Exchange account"],
        correct: 1,
        explanation: "A payment channel allows multiple transactions off-chain before settling on the main chain."
    },
    // Stablecoins
    {
        question: "What is a stablecoin?",
        answers: ["Volatile crypto", "Price-stable crypto", "Mining reward"],
        correct: 1,
        explanation: "A stablecoin is a cryptocurrency designed to maintain a stable value."
    },
    {
        question: "What backs USDC?",
        answers: ["Nothing", "US Dollars", "Gold"],
        correct: 1,
        explanation: "USDC is backed by US Dollars held in regulated financial institutions."
    },
    // Blockchain Interoperability
    {
        question: "What is a bridge in crypto?",
        answers: ["Exchange", "Cross-chain transfer", "Wallet"],
        correct: 1,
        explanation: "A bridge enables assets to be transferred between different blockchain networks."
    },
    {
        question: "What is atomic swap?",
        answers: ["Token sale", "Cross-chain exchange", "Mining process"],
        correct: 1,
        explanation: "Atomic swap allows direct exchange of cryptocurrencies across different blockchains."
    }
];

// DOM Elements
const screens = {
    home: document.getElementById('home-screen'),
    game: document.getElementById('game-screen'),
    result: document.getElementById('result-screen')
};

const elements = {
    startBtn: document.getElementById('start-btn'),
    playAgainBtn: document.getElementById('play-again-btn'),
    question: document.getElementById('question'),
    answerBtns: document.querySelectorAll('.answer-btn'),
    timerBar: document.querySelector('.timer-bar'),
    timeLeft: document.querySelector('.time-left'),
    score: document.querySelector('#score span'),
    lives: document.querySelector('#lives span'),
    questionCounter: document.querySelector('#question-counter span'),
    finalScore: document.querySelector('.final-score span'),
    correctCount: document.querySelector('.correct-count'),
    accuracy: document.querySelector('.accuracy')
};

// Event Listeners
elements.startBtn.addEventListener('click', startGame);
elements.playAgainBtn.addEventListener('click', () => {
    showScreen('home');
    resetGameState();
});

// Add event listeners to answer buttons
elements.answerBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (!gameState.isAnswered) {
            checkAnswer(index);
        }
    });
});

// Game Functions
function startGame() {
    // Select and shuffle questions for this game
    selectRandomQuestions();
    
    // Start celebration
    createConfetti();
    showWelcomeMessage();
    
    setTimeout(() => {
        showScreen('game');
        resetGameState();
        displayQuestion();
        startTimer();
    }, 2000); // Wait for celebration to finish
}

function selectRandomQuestions() {
    // Create a copy of all questions
    let allQuestions = [...questions];
    gameState.currentQuestions = [];
    
    // Shuffle all questions
    for (let i = allQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }
    
    // Select first QUESTIONS_PER_GAME questions
    gameState.currentQuestions = allQuestions.slice(0, QUESTIONS_PER_GAME);
}

function resetGameState() {
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.timeLeft = 15;
    gameState.correctAnswers = 0;
    gameState.isAnswered = false;
    gameState.lives = 5;
    // Select new set of questions
    selectRandomQuestions();
    updateUI();
}

function displayQuestion() {
    const current = gameState.currentQuestions[gameState.currentQuestion];
    elements.question.textContent = current.question;
    
    // Create a shuffled array of answer objects with their indices
    const shuffledAnswers = current.answers.map((answer, index) => ({
        text: answer,
        isCorrect: index === current.correct
    }));
    
    // Shuffle the answers
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    
    // Update the buttons with shuffled answers
    elements.answerBtns.forEach((btn, index) => {
        if (index < 3) { // Only use first 3 buttons
            btn.style.display = 'block';
            btn.textContent = shuffledAnswers[index].text;
            btn.dataset.correct = shuffledAnswers[index].isCorrect;
            btn.classList.remove('correct', 'wrong');
        } else {
            btn.style.display = 'none';
        }
    });
    
    elements.questionCounter.textContent = `${gameState.currentQuestion + 1}/${QUESTIONS_PER_GAME}`;
    gameState.isAnswered = false;
}

function startTimer() {
    clearInterval(gameState.timer);
    gameState.timeLeft = 15;
    elements.timeLeft.textContent = gameState.timeLeft;
    elements.timerBar.style.width = '100%';

    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        elements.timeLeft.textContent = gameState.timeLeft;
        elements.timerBar.style.width = `${(gameState.timeLeft / 15) * 100}%`;

        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            handleTimeout();
        }
    }, 1000);
}

function updateTimerUI() {
    elements.timeLeft.textContent = gameState.timeLeft;
    elements.timerBar.style.width = `${(gameState.timeLeft / 15) * 100}%`;
}

function checkAnswer(selectedIndex) {
    if (gameState.isAnswered) return;
    gameState.isAnswered = true;

    const selectedButton = elements.answerBtns[selectedIndex];
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        const timeBonus = Math.floor(gameState.timeLeft * 0.5);
        gameState.score += 10 + timeBonus;
        gameState.correctAnswers++;
        selectedButton.classList.add('correct');
        celebrate();
    } else {
        gameState.lives--;
        selectedButton.classList.add('wrong');
        
        // Show correct answer
        elements.answerBtns.forEach(btn => {
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            }
        });
        
        if (gameState.lives <= 0) {
            endGame();
            return;
        }
    }

    updateUI();

    // Show explanation and move to next question
    setTimeout(() => {
        if (gameState.currentQuestion < QUESTIONS_PER_GAME - 1 && gameState.lives > 0) {
            gameState.currentQuestion++;
            displayQuestion();
            startTimer();
        } else {
            endGame();
        }
    }, 2000);
}

function handleTimeout() {
    if (!gameState.isAnswered) {
        gameState.lives--;
        gameState.isAnswered = true;
        
        // Just show that time is up, don't reveal correct answer
        elements.timeLeft.textContent = 'Time Up!';
        elements.timerBar.style.width = '0%';
        
        if (gameState.lives <= 0) {
            endGame();
            return;
        }
    }
    
    updateUI();
    
    // Move to next question after delay
    setTimeout(() => {
        if (gameState.currentQuestion < QUESTIONS_PER_GAME - 1 && gameState.lives > 0) {
            gameState.currentQuestion++;
            displayQuestion();
            startTimer();
        } else {
            endGame();
        }
    }, 1500); // Reduced delay since we're not showing the correct answer
}

function updateUI() {
    elements.score.textContent = gameState.score;
    elements.lives.textContent = gameState.lives;
    
    // Add visual indicator for low lives
    const livesElement = document.getElementById('lives');
    if (gameState.lives <= 2) {
        livesElement.classList.add('low');
    } else {
        livesElement.classList.remove('low');
    }
}

function endGame() {
    clearInterval(gameState.timer);
    showScreen('result');
    elements.finalScore.textContent = gameState.score;
    elements.correctCount.textContent = gameState.correctAnswers;
    elements.accuracy.textContent = Math.round((gameState.correctAnswers / QUESTIONS_PER_GAME) * 100);
    
    // Show end game celebration
    showEndGameMessage();
}

function resetGame() {
    showScreen('home');
    resetGameState();
}

// Celebration Functions
function createConfetti() {
    const colors = ['#6c5ce7', '#00b894', '#00cec9', '#0984e3', '#6c5ce7'];
    const confettiCount = 50;
    const container = document.getElementById('celebration-container');
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animation = `confetti-fall ${1 + Math.random() * 2}s linear forwards`;
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

function showWelcomeMessage() {
    const container = document.getElementById('celebration-container');
    const text = document.createElement('div');
    text.className = 'celebration-text welcome';
    text.textContent = '🎮 Let\'s Play! 🎮';
    container.appendChild(text);
    
    // Remove text after animation
    setTimeout(() => {
        text.remove();
    }, 2000);
}

function showEndGameMessage() {
    const container = document.getElementById('celebration-container');
    const text = document.createElement('div');
    text.className = 'celebration-text end-game';
    text.textContent = '🏆 Well Done! Take a screenshot to save your score! 📸';
    container.appendChild(text);
    
    // Create confetti for end game
    createConfetti();
    
    // Remove text after animation
    setTimeout(() => {
        text.remove();
    }, 3000);
}

function showCelebrationText() {
    const container = document.getElementById('celebration-container');
    const text = document.createElement('div');
    text.className = 'celebration-text';
    text.textContent = '🎉 Correct! 🎉';
    container.appendChild(text);
    
    // Remove text after animation
    setTimeout(() => {
        text.remove();
    }, 1000);
}

function celebrate() {
    createConfetti();
    showCelebrationText();
    document.querySelector('.game-container').classList.add('correct-answer-flash');
    setTimeout(() => {
        document.querySelector('.game-container').classList.remove('correct-answer-flash');
    }, 500);
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}
