import React from "react";
import { Button, Grid } from "@nextui-org/react";
import { useStateContext } from "@/context/stateContext";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Account = () => {
  const { showSignIn, setIsAuthenticated, setShowSignIn, isAuthenticated } =
    useStateContext();
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const handleSignOut = () => {
    signOut();
    setIsAuthenticated(false);
  };

  return (
    <Grid.Container
      css={{
        borderRadius: "14px",
        justifyContent: "flex-start",

        // maxWidth: "330px",
      }}
    >
      <Grid.Container>
        {isAuthenticated ? (
          <>
            <Grid
              css={{
                "&:hover": {
                  background: "$green400",
                  borderRadius: "8px",
                },
              }}
            >
              <Button size="sm" light>
                My Account
              </Button>
            </Grid>
            <Grid
              css={{
                "&:hover": {
                  background: "$red600",
                  color: "white",
                  borderRadius: "8px",
                },
              }}
            >
              <Button size="sm" light onClick={() => handleSignOut()}>
                Sign Out
              </Button>
            </Grid>
          </>
        ) : (
          <Grid
            css={{
              "&:hover": {
                background: "$green400",
                borderRadius: "8px",
              },
            }}
          >
            <Button size="sm" light onClick={() => setShowSignIn(true)}>
              Sign In
            </Button>
          </Grid>
        )}
      </Grid.Container>
    </Grid.Container>
  );
};

export default Account;
