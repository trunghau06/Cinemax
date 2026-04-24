export type RootStackParamList = {
    Onboarding: undefined;
    Splash: undefined;
    LogSign: undefined;
    LogIn: undefined;
    SignUp: undefined;
    Forgot: undefined;
    Home: undefined;
    Detail: { movieId: number }; 
    AllMovies: { type: "Popular" | "Recommended" | "Comedy" | "Animation" | "Documentary" | "Action" | "All"; title: string }
    EditProfile: undefined;
    Privacy: undefined;
    Aboutus: undefined;
    HelpFeed: undefined;
};

export type BottomTabParamList = {
    HomePage: undefined;
    Search: { initialQuery?: string };
    Download: undefined;
    Profile: undefined;
};