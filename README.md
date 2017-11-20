# Scaling a Redux app - reusable containers

<img src="https://raw.githubusercontent.com/rikukissa/redux-isolated-apps/master/diagram.png" width="452" />

The idea here is to experiment with building Redux applications by reusing Redux applications. So basically a classic Yo Dawg situation. I'm doing this in the name of science and in the hope that future generations would have a more structured way of building user interfaces.

This repository functions as a sandbox for testing different methods of cluing these Redux apps together. The way I see it, this could potentially lead into more scalable Redux codebases as you would now have a concept even greater than components or containers, that both are quite low-level. Also a really practical thing you could use this for would be a bit more complex reusable components like date pickers that have a state of their own, but have to use `this.setState`, component state & other funny stuff for managing the state.

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

#### Pros
- Minimalistic approach, easy to understand
- No additional dependencies needed
- Minimal code changes required when isolating pieces of UI
- Easy integration with redux-loop, redux-forms etc
- You can reuse the component dynamically anywhere without needing to explicitely define it in reducer
  - App store state remains a bit cleaner

#### Cons/Challenges
##### Case 1.
**Example case**
> I want to notify the parent component about created user **after** it has been succesfully stored to our API

```js
<UserCreator onUserCreated={/* call this after save */} />
```

**The problem**
> How do I call **this.props.onUserCreated** as a consequence of a dispatched **MY_NESTED/USER_SAVED_SUCCESS**?


**Possible solutions**
Since we are creating a nested store for our component, we might as well apply middlewares to that store. We could, for instance create a "bridge" between internal actions and prop callback calls. The underlying middleware would take care of calling these defined methods when ever a suitable action is dispatched.

```js
// like mapStateToProps & mapDispatchToProps
function actionsToProps(props) {
  return {
    /* dispatched action */           /* callback prop call */
    [CREATE_USER]: (state, action) => props.onUserCreated({ name: state.name })
  };
}
```

The thing that I don't like about this approach is, that you now have to expose action types to components / containers. It seems like a small thing that I would be willing to live with, but I have a feeling it might be a telltale sign of an architectural problem.



##### Case 2.

**Example case**
> I want to create a button for clearing all UserCreator inputs

🙃  This is were it gets even more complicated.

**The problem**
> How do I trigger **MY_NESTED/CLEAR** as a consequence of **TOP_LEVEL/CLEAR_ALL**?


The only semi-clean way of doing it that I could come up with, would be to create a `top-level action -> nested store action` bridge. Something similar to what you saw above, but with 

```js
// like mapStateToProps & mapDispatchToProps & actionsToProps
function actionsToActions() {
  return {
    /* top-level */ /* nested */
    [CLEAR_ALL]: CLEAR_INPUT
  };
}
```

However, it would still have the same problem with components knowing about actions. On top of that, as far as I know this impossible to achieve with a vanilla Redux store instance. This is because a Redux store doesn't provide a way of listening actions it receives. This is why we used a middleware to solve the previous problem. Now we can't really do that, because we are not no longer in control of the store which exists outside the scope of our UserCreator component 😔

**Possible solutions**
I wish I had one.

---

### [redux-subspace](https://github.com/ioof-holdings/redux-subspace)
![](https://travis-ci.org/rikukissa/redux-isolated-apps.svg?branch=subspaces)
[Pull request](https://github.com/rikukissa/redux-isolated-apps/pull/3)

>After using this method in production for couple of months now, I already feel like some parts of the codebase become overly complicated. Most of it is because it's quite difficult to see just by looking at the code to which "subspace" the component / actions belong to. This can potentially be remedied by avoiding the usage of `globalAction` and coming up with some way of achieving your goal just by using component props. Other thing I would advice against is the usage of [wormholes](https://github.com/ioof-holdings/redux-subspace/blob/master/docs/advanced/GlobalState.md#wormholes). It's most likely better to pass the required data down as props.
**Would still recommend this library and I'm keen to see how it evolves in the future**

I bumped into this by accident while googling this subject. At first the documentation was a bit off-putting, but once I got desperate enough, I decided to give it a go. I definitely recommend checking it out, since it has been easily the best solution I've found so far. Once you start using it, you will find the documentation actually quite nicely structured.

Besides just offering a solution to the problem I described above, I wanted to make sure it also works with other libraries we're often using in our apps. There are currently 2 different branches I made for this:
- ![](https://travis-ci.org/rikukissa/redux-isolated-apps.svg?branch=subspaces-redux-loop) [redux-loop](https://github.com/rikukissa/redux-isolated-apps/pull/4)
- ![](https://travis-ci.org/rikukissa/redux-isolated-apps.svg?branch=subspaces-redux-form) [redux-form](https://github.com/rikukissa/redux-isolated-apps/pull/6)

**Pros**:
- Easy to use, well tested & documented
- Integrates well with middlewares and store enhancers like redux-saga, redux-observable & redux-loop

**Cons:**
- Might hurt the readability of your code in the long run
- Subspaced component's state becomes a part of your app's store state, which by default means, that you have to define a location for that explicitly in your reducer. This makes it a bit tricky to dynamically add new subspaced components. However, there is an additional library [redux-dynamic-reducer](https://github.com/ioof-holdings/redux-dynamic-reducer) for addressing this problem.
- The reducer & action creators are dependant on the main app's middlewares / store enhancers. Using redux-thunk / redux-loop in the subspaced component's logic forces the app to also have them installed. This is not a problem with substores.
- It didn't support redux-loop when I first started using it, but I managed to fix this by writing a wrapper function, that now can be found as the [`redux-subspace-loop`](https://github.com/ioof-holdings/redux-subspace/tree/master/packages/redux-subspace-loop) package on npm.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
