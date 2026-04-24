export type RootStackParamList = {
    Onboarding: undefined;
    Splash: undefined;
    LogSign: undefined;
    LogIn: undefined;
    SignUp: undefined;
    Forgot: undefined;
    Home: undefined;
    Detail: { movieId: number }; 
    AllMovies: { type: "Popular" | "Recommended" ; title: string};
    EditProfile: undefined;
};

export type BottomTabParamList = {
    HomePage: undefined;
    Search: { initialQuery?: string };
    Download: undefined;
    Profile: undefined;
};