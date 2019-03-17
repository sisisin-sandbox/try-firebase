import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppState } from '../../App';
import { Home } from './Home';
import { homeAggregate } from './HomeMT';

const mapState = (state: AppState) => {
  return state.home;
};
const mapDispatch = (dispach: Dispatch) => bindActionCreators(homeAggregate.creators, dispach);
export const HomeContainer = connect(
  mapState,
  mapDispatch,
)(Home);

export type HomeProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
