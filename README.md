# Vimbal

## How to Setup

### Prerequisites

- NodeJs: [NodeJs](https://nodejs.org/en/download/)  
- Ganache: [Ganache](https://trufflesuite.com/ganache/index.html)
- MetaMask Extension: [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)

1. Open Ganache and Start an Instance

![image](https://user-images.githubusercontent.com/53285026/159238772-6c711d55-e072-4d85-a7ab-70deac50dbaf.png)

2. Copy Private Key from Ganache Account

![image](https://user-images.githubusercontent.com/53285026/160361607-2eeb1baf-2820-4678-acfd-84b35de73283.png)

3. Install Angular CLI
```
npm install -g @angular/cli
```

4. Install Truffle
```
npm install -g truffle@5.1.65
```

5. Clone Project and Navigate to Folder
```
git clone https://github.com/CSWanigasooriya/vimbal
cd vimbal
```

6. Install Node Modules
```
npm install
```

7. Compile Smart Contracts
```
truffle compile
```

8. Migrate Contracts to Blockchain
```
truffle migrate --reset
```

9. Serve the application
```
npm start
```

## Commit Guidelines

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|ngcc|ve|
  │                          devtools
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test|chore
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.
