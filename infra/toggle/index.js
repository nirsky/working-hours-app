import { Observable, BehaviorSubject } from 'rxjs';
import { setObservableConfig, mapPropsStream } from 'recompose';

setObservableConfig({ fromESObservable: Observable.from });

export const withToggle = ({propName, toggleStates, defaultState}) => mapPropsStream(props$ => {
    const state$ = new BehaviorSubject(defaultState);
    const toggle = () => {
        const currentState = state$.value;
        const toState = toggleStates[(toggleStates.indexOf(currentState)+1) % toggleStates.length];
        state$.next(toState);
    };

    return Observable.combineLatest(props$, state$, (props, state) => ({
        ...props,
        [propName]: {
            state,
            toggle
        }
    }))
        .finally(() => state$.unsubscribe());
});