# Scaling a Redux app - reusable containers

<img src="https://raw.githubusercontent.com/rikukissa/redux-isolated-apps/master/diagram.png" width="452" />

The idea of this repository is to provide a sandbox for testing different methods of making a Redux app more scalable by isolating complex pieces of logic to independent, reusable blocks of code. This could potentially be useful for component authors as well, since instead of just using React's API (state, setState, ...) you would be able to use Redux for handling your component's internal logic!

### Structure of this repository

Currently on the master branch, I have a component called [`<UserCreator />`](https://github.com/rikukissa/redux-isolated-apps/tree/master/src/UserCreator) that has the purpose of being a component/widget/fragment that the user would use for creating new users. Basically it's just an text input and a submit button.

From the developer's point of view, I would want to be able to include this component anywhere in my app, without always having to manually connect to a store. So in the best case scenario, the only thing you would need is a `<UserCreator />` tag.

**Few design principles for `<UserCreator />`:**
- It should not know anything about being isolated
  - Its implementation should look exactly like normal container's
- It communicates to outer world only via props
  - It can only access its own state + state given to it as props
- It can be attached anywhere on the app without any additional setup
- Middleware / enhancers used in its reducer / action creator implementation should be completely independent from app's
  - e.g. Using redux-saga as a part of UserCreator does not mean it should be also added to `src/store.js`

I would also want it to be isolated in a way that it wouldn't share any state with other UserCreators in my app. In the future it will include a lot of logic (both async and sync), and for that reason I want to be able to leverage the action/action creator/reducer pattern Redux provides.

I've written a few [tests](https://github.com/rikukissa/redux-isolated-apps/blob/master/src/App.test.js) to make these requirements a bit clearer, but unfortunately in the master branch some of them are failing. You can run them by running `yarn test` or `npm test`. All the relevant code for this endeavour lives under the `src` directory.

**Leave an issue / a pull request if you know other ways of making Redux apps scalable or if you have other problems that you would like to solve.**

## Methods & libraries I've tried so far

### Nested stores
![](https://travis-ci.org/rikukissa/redux-isolated-apps.svg?branch=substores)
[Pull request](https://github.com/rikukissa/redux-isolated-apps/pull/2)

I got this idea from [Redux's documentation](http://redux.js.org/docs/recipes/IsolatingSubapps.html). It's fairly simple to see what's going on just by looking at the code and I actually managed to get everything working with this method as well. At first my main concern was whether the tooling will play well with multiple stores, but it turns out that at least Redux DevTools lets you choose which store you want to observe.

**Pros:**
- Minimalistic approach, easy to understand
- No additional dependencies needed
- Minimal code changes required when isolating pieces of UI
- Easy integration with redux-loop, redux-forms etc
- You can reuse the component dynamically anywhere without needing to explicitely define it in reducer
  - App store state remains a bit cleaner

**Challenges:**
- No way of calling global actions _(Not sure if this is only a bad thing)_
  - **Solutions:**
    - Create a "bridge" between internal actions and prop callback calls. Bridge methods are called after the internal logic has changed the state
      ```js
      function actionsToProps(props) {
        return {
          [CREATE_USER]: (state, action) => props.onUserCreated({ name: state.name })
        };
      }
      ```

### [redux-subspace](https://github.com/ioof-holdings/redux-subspace)
![](https://travis-ci.org/rikukissa/redux-isolated-apps.svg?branch=subspaces)
[Pull request](https://github.com/rikukissa/redux-isolated-apps/pull/3)

🏆 I bumped into this by accident while googling this subject. At first the documentation was a bit off-putting, but once I got desperate enough, I decided to give it a go. I definitely recommend checking it out, since it has been easily the best solution I've found so far. Once you start using it, you will find the documentation actually quite nicely structured.

Besides just offering a solution to the problem I described above, I wanted to make sure it also works with other libraries we're often using in our apps. There are currently 2 different branches I made for this:
- ![](https://travis-ci.org/rikukissa/redux-isolated-apps.svg?branch=subspaces-redux-loop) [redux-loop](https://github.com/rikukissa/redux-isolated-apps/pull/4)
- ![](https://travis-ci.org/rikukissa/redux-isolated-apps.svg?branch=subspaces-redux-form) [redux-form](https://github.com/rikukissa/redux-isolated-apps/pull/6)

**Pros**:
- Easy to use, well tested & documented
- Integrates well with middlewares and store enhancers like redux-saga, redux-observable & redux-loop

**Cons:**
- Subspaced component's state becomes a part of your app's store state, which by default means, that you have to define a location for that explicitly in your reducer. This makes it a bit tricky to dynamically add new subspaced components. However, there is an additional library [redux-dynamic-reducer](https://github.com/ioof-holdings/redux-dynamic-reducer) for addressing this problem.
- The reducer & action creators are dependant on the main app's middlewares / store enhancers. Using redux-thunk / redux-loop in the subspaced component's logic forces the app to also have them installed. This is not a problem with substores.
- It didn't support redux-loop when I first started using it, but I managed to fix this by writing a wrapper function, that now can be found as the [`redux-subspace-loop`](https://github.com/ioof-holdings/redux-subspace/tree/master/packages/redux-subspace-loop) package on npm.


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
