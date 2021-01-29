import "./styles/index.css";
import StageC from './components/stage';
import TimelineC from './components/timeline';

const Stage = new StageC("stage");
Stage.render();

const Timeline = new TimelineC("timeline");
Timeline.render();
