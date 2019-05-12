module.exports = {
    collectCoverageFrom: [
        'src/**/*.js',
        'src/*.js',
        'src/**/*.jsx',
        'src/*.jsx'
    ],
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            'branches': 0,
            'functions': 0,
            'lines': 0,
            'statements': 0
        }
    },
    globals: {
        NODE_ENV: 'test'
    },
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    modulePathIgnorePatterns: [
        '<rootDir>/public',
    ],
    testURL: 'http://localhost:8080',
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    },
    moduleNameMapper: {
        '^.+\\.(css|scss)$': 'babel-jest'
    }
};
