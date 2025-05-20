import { definePreset } from "@primevue/themes";

export const setPreset = (theme) => {
  return definePreset(theme, {
    semantic: {
      primary: { // Change color primary to your preference
        50: "{blue.50}",
        100: "{blue.100}",
        200: "{blue.200}",
        300: "{blue.300}",
        400: "{blue.400}",
        500: "{blue.500}",
        600: "{blue.600}",
        700: "{blue.700}",
        800: "{blue.800}",
        900: "{blue.900}",
        950: "{blue.950}",
      },
      colorScheme: {
        light: {
          surface: {
            0: "white",
            50: "{zinc.50}",
            100: "{zinc.100}",
            200: "{zinc.200}",
            300: "{zinc.300}",
            400: "{zinc.400}",
            500: "{zinc.500}",
            600: "{zinc.600}",
            700: "{zinc.700}",
            800: "{zinc.800}",
            900: "{zinc.900}",
            950: "{zinc.950}",
          },
        },
        dark: {
          primary: { // Change color primary to your preference
            50: "{blue.50}",
            100: "{blue.100}",
            200: "{blue.200}",
            300: "{blue.300}",
            400: "{blue.400}",
            500: "{blue.500}",
            600: "{blue.600}",
            700: "{blue.500}",
            800: "{blue.800}",
            900: "{blue.900}",
            950: "{blue.950}",
          },
          surface: {
            0: "white",
            50: "{slate.50}",
            100: "{slate.100}",
            200: "{slate.200}",
            300: "{slate.300}",
            400: "{slate.400}",
            500: "{slate.500}",
            600: "{slate.600}",
            700: "{slate.700}",
            800: "{slate.800}",
            900: "{slate.900}",
            950: "{slate.950}",
          },
        },
      },
    },
    components: {
      button: {
        colorScheme: {
          dark: {
            outlined: {
              primary: {
                border: {
                  color: '{blue.400}',
                },
                hover: {
                  
                },
                color: '{blue.300}',
              }
            },
            text: {
              primary: {
                color: '{blue.300}',
              }
            }
          }
        }
      }
    }
  });
}