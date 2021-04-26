import ArtistFeature from "./artist";
import CommandFeature from "./commands";
import MiddlewareFeature from "./middlewares";
import PerfFeature from "./performance";
import PilotFeature from "./pilot";
import PluginFeature from "./plugins";
import TestingFeature from "./testing";

const ft = {};

ft.Middlware = MiddlewareFeature;
ft.Command = CommandFeature;
ft.Plugin = PluginFeature;
ft.Pilot = PilotFeature;
ft.Artist = ArtistFeature;
ft.Testing = TestingFeature;
ft.Perf = PerfFeature;

export default ft;
