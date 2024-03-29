import React from "react";
import Link from "next/link";
import { Button, Grid } from "@nextui-org/react";
import { useStateContext } from "@/context/stateContext";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Nav = () => {
  const {
    showSignIn,
    setIsAuthenticated,
    setShowSignIn,
    isAuthenticated,
    setCognitoUser,
  } = useStateContext();
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const handleSignOut = () => {
    signOut();
    setCognitoUser("");
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
              {/* <Link href="/account" passHref> */}
                <Button size="sm" light>
                  My Account
                </Button>
              {/* </Link> */}
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

export default Nav;
