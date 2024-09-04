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

const Signature = () => {
  return <HTMLComment text={str} />;
};

export default Signature;
