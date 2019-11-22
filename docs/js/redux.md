# Redux

If you haven't worked with Redux, it's highly recommended (possibly indispensable!)
to read through the (amazing) [official documentation](http://redux.js.org)
and/or watch this [free video tutorial series](https://egghead.io/series/getting-started-with-redux).

## Usage

See above! As minimal as Redux is, the challenge it addresses - app state
management - is a complex topic that is too involved to properly discuss here.

You can attach a dynamic reducer to a component whether it's a regular component
or a component that will be loaded dynamically. Dynamic means that it will be
injected when the component it attached to is mounted. In your component's `index.js`:

```JS
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

// ...

export function mapDispatchToProps(dispatch) {
  // ...
}

const mapStateToProps = createStructuredSelector({
  // ...
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'yourcomponent', reducer });

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withConnect,
)(YourComponent);
```

You don't need to do it by hand, a `container` generator will generate everything
that's necessary.
