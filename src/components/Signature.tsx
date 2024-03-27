import HTMLComment from 'react-html-comment';
import React from 'react';

const str =
  '-\n\
                                                                      \n\
                      :                             ..                \n\
:     .:                     :.        -            ..           .:   \n\
                :.               ..                                   \n\
                                          .            :.             \n\
     -               -        -          ..     .##                 :.\n\
           -                                   :#:-#.+*+      .       \n\
               =%           :.          :     :#   :+- -#.    :       \n\
:.           -*:#.       :                    *-     -. .*+.          \n\
           :*=  :*=.             .:         =*-       .-  :*+:        \n\
      -  :*=      .==++=.                .+*:            =. .+*.      \n\
     *+*+=.            .*+-.          +++=.                .  :++:    \n\
   -#- =                  :++:  :-+++::                    :+     -.::\n\
.:-:  -                     .-*%#=------::.                    -=     \n\
.  -:                            .:::..:::-+++==-: .               .: \n\
                                               .:..: -:               \n\
-';

export default class Signature extends React.Component {
  render() {
    return <HTMLComment text={str} />;
  }
}
