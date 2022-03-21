# Vimbal

## How to Setup

### Prerequisites

- NodeJs: [NodeJs](https://nodejs.org/en/download/)  
- Ganache: [Ganache](https://trufflesuite.com/ganache/index.html)

1. Open Ganache and Start an Instance

2. Install Angular CLI
```
npm install -g @angular/cli
```

3. Install Truffle
```
npm install -g truffle@5.1.65
```

4. Clone Project and Navigate to Folder
```
git clone https://github.com/CSWanigasooriya/vimbal
cd vimbal
```

5. Install Node Modules
```
npm install
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
