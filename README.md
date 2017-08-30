# Scaling a Redux app

The idea of this repository is to provide a sandbox for testing different methods of making a Redux app more scalable. Currently in the master branch, I have a component called [`<UserCreator />`](https://github.com/rikukissa/redux-isolated-apps/tree/master/src/UserCreator) that has the purpose of being a component/widget/fragment that the user would use to create new users with. From the developer's point of view, I would want to be able to include this component anywhere in my app, without always having to manually connect to a store. So in the best case scenario, the only thing you would need is a `<UserCreator />` tag.
I would also want it to be isolated in a way that it wouldn't share any state with other UserCreators in my app. In the future it will include a lot of logic (both async and sync), and for that reason I want to be able to leverage the action/action creator/reducer pattern Redux provides.

I've written a few [tests](https://github.com/rikukissa/redux-isolated-apps/blob/master/src/App.test.js) to make these requirements a bit clearer, but unfortunately in the master branch some of them are failing. You can run them by running `yarn test` or `npm test`. All the relevant code for this endeavour lives under the `src` directory.

**Leave an issue / a pull request if you know other ways of making Redux apps scalable or if you have other problems that you would like to solve.**

## Methods & libraries I've tried so far

### Nested stores
[Pull request](https://github.com/rikukissa/redux-isolated-apps/pull/2)

I got this idea from [Redux's documentation](http://redux.js.org/docs/recipes/IsolatingSubapps.html). It's fairly simple to see what's going on just by looking at the code and I actually managed to get everything working with this method as well. At first my main concern was whether the tooling will play well with multiple stores, but it turns out that at least Redux DevTools lets you choose which store you want to observe.

**Pros:**
- Minimalistic approach, easy to understand
- No additional dependencies needed
- Minimal code changes required when isolating pieces of UI
- Easy integration with redux-loop, redux-forms etc

**Cons:**
- No way of calling global actions
  - **Solutions:**
    - Adding callback props to widget
      - **Cons:**
        - Transforming reducer events into callback prop calls gets a bit hairy

### [redux-subspace](https://github.com/ioof-holdings/redux-subspace)
[Pull request](https://github.com/rikukissa/redux-isolated-apps/pull/3)

🏆 I bumped into this by accident while googling this subject. At first the documentation was a bit off-putting, but once I got desperate enough, I decided to give it a go. I definitely recommend checking it out, since it has been easily the best solution I've found so far. Once you start using it, you will find the documentation actually quite nicely structured.

**Pros**:
- Easy to use, well tested & documented
- Integrates well with middlewares and store enhancers like redux-saga, redux-observable & redux-loop

**Cons:**
- It didn't support redux-loop when I first started using it, but I managed to fix this by writing a wrapper function, that now can be found as the [`redux-subspace-loop`](https://github.com/ioof-holdings/redux-subspace/tree/master/packages/redux-subspace-loop) package on npm.


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
