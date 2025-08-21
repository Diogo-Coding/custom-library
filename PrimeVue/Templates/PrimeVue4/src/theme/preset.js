import { definePreset } from '@primevue/themes'

export const setPreset = (theme) => {
  return definePreset(theme, {
    semantic: {
      primary: {
        50: '{brand.50}',
        100: '{brand.100}',
        200: '{brand.200}',
        300: '{brand.300}',
        400: '{brand.400}',
        500: '{brand.500}',
        600: '{brand.600}',
        700: '{brand.700}',
        800: '{brand.800}',
        900: '{brand.900}',
        950: '{brand.950}'
      },
      colorScheme: {
        light: {
          text: {
            color: '{surface.700}'
          },
          surface: {
            0: 'white',
            50: '{slate.50}',
            100: '{slate.100}',
            200: '{slate.200}',
            300: '{slate.300}',
            400: '{slate.400}',
            500: '{slate.500}',
            600: '{slate.600}',
            700: '{slate.700}',
            800: '{slate.800}',
            900: '{slate.900}',
            950: '{slate.950}'
          }
        },
        dark: {
          primary: {
            50: '{brand.50}',
            100: '{brand.100}',
            200: '{brand.200}',
            300: '{brand.300}',
            400: '{brand.400}',
            500: '{brand.500}',
            600: '{brand.600}',
            700: '{brand.500}',
            800: '{brand.800}',
            900: '{brand.900}',
            950: '{brand.950}'
          },
          surface: {
            0: 'white',
            50: '{neutral.50}',
            100: '{neutral.100}',
            200: '{neutral.200}',
            300: '{neutral.300}',
            400: '{neutral.400}',
            500: '{neutral.500}',
            600: '{neutral.600}',
            700: '{neutral.700}',
            800: '{neutral.800}',
            900: '{neutral.900}',
            950: '{neutral.950}'
          }
        }
      }
    },
    components: {
      button: {
        colorScheme: {
          light: {
            root: {
              secondary: {
                background: '{surface.200}',
                hover: {
                  background: '{surface.300}'
                },
                active: {
                  background: '{surface.400}'
                }
              }
            },
            text: {
              secondary: {
                background: '{surface.100}',
                hover: {
                  background: '{surface.200}'
                },
                active: {
                  background: '{surface.300}'
                }
              }
            },
            outlined: {
              secondary: {
                hover: {
                  background: '{surface.200}'
                },
                active: {
                  background: '{surface.300}'
                },
                border: {
                  color: '{surface.400}'
                }
              }
            }
          },
          dark: {
            outlined: {
              primary: {
                border: {
                  color: '{brand.400}'
                },
                hover: {},
                color: '{brand.300}'
              }
            },
            text: {
              primary: {
                color: '{brand.300}'
              },
              secondary: {
                background: '{surface.600}',
                hover: {
                  background: '{surface.700}'
                },
                active: {
                  background: '{surface.800}'
                }
              }
            }
          }
        }
      }
    }
  })
}
