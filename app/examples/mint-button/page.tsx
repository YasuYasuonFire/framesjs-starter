import { getTokenUrl } from "frames.js";
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import Link from "next/link";
import { zora } from "viem/chains";

type State = {
  pageIndex: number;
};

const nfts: {
  src: string;
  tokenUrl: string;
}[] = [
  {
    src: "https://storage.googleapis.com/sbtdatastorage/01_test/pic/DALL%C2%B7E%202024-02-18%2013.48.44%20-%20A%20finely%20dressed%20bear%20standing%20proudly%20outside%20his%20unique%20sushi%20bar.%20The%20sushi%20bar%20exterior%20resembles%20a%20giant%20sushi%20roll%2C%20complete%20with%20rice%20and%20seawe.webp",
    tokenUrl: getTokenUrl({
      address: "0x99de131ff1223c4f47316c0bb50e42f356dafdaa",
      chain: zora,
      tokenId: "2",
    }),
  },
  {
    src: "https://storage.googleapis.com/sbtdatastorage/01_test/pic/DALL%C2%B7E%202024-02-18%2013.48.50%20-%20Inside%20the%20sushi%20bar%2C%20a%20bear%20wearing%20a%20chef's%20hat%20is%20skillfully%20preparing%20sushi%20on%20a%20bamboo%20mat.%20The%20bear%20is%20focused%20and%20precise%2C%20surrounded%20by%20fresh%20.webp",
    tokenUrl: getTokenUrl({
      address: "0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df",
      chain: zora,
      tokenId: "1",
    }),
  },
  {
    src: "https://storage.googleapis.com/sbtdatastorage/01_test/pic/DALL%C2%B7E%202024-02-18%2013.48.55%20-%20A%20close-up%20of%20a%20special%20sushi%20roll%20on%20a%20wooden%20plate%2C%20created%20by%20the%20bear%20chef.%20The%20sushi%20roll%20is%20artistically%20arranged%20to%20resemble%20a%20bear's%20face%2C%20usi.webp",
    tokenUrl: getTokenUrl({
      address: "0x8f5ed2503b71e8492badd21d5aaef75d65ac0042",
      chain: zora,
      tokenId: "3",
    }),
  },
  {
    src: "https://storage.googleapis.com/sbtdatastorage/01_test/pic/DALL%C2%B7E%202024-02-18%2013.48.59%20-%20The%20bear%20chef%20and%20his%20customers%20are%20enjoying%20a%20lively%20party%20inside%20the%20sushi%20bar.%20The%20scene%20is%20filled%20with%20laughter%2C%20clinking%20glasses%2C%20and%20people%20eati.webp",
    tokenUrl: getTokenUrl({
      address: "0x8f5ed2503b71e8492badd21d5aaef75d65ac0042",
      chain: zora,
      tokenId: "3",
    }),
  },
];
const initialState: State = { pageIndex: 0 };

const reducer: FrameReducer<State> = (state, action) => {
  const buttonIndex = action.postBody?.untrustedData.buttonIndex;

//   return {
//     pageIndex: buttonIndex
//       ? (state.pageIndex + (buttonIndex === 2 ? 1 : -1)) % nfts.length
//       : state.pageIndex,
//   };
// };
return {
  pageIndex: buttonIndex
    ? Math.max(0, Math.min(state.pageIndex + (buttonIndex === 2 ? 1 : -1), nfts.length - 1))
    : state.pageIndex,
  };
};
// This is a react server component only
export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(searchParams);
  const [state] = useFramesReducer<State>(reducer, initialState, previousFrame);

  // then, when done, return next frame
  return (
    <div>
      Kamishibai <Link href="/debug">Debug</Link>
      <FrameContainer
        pathname="/examples/mint-button"
        postUrl="/examples/mint-button/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage
          src={nfts[state.pageIndex]!.src}
          aspectRatio="1:1"
        ></FrameImage>
        <FrameButton>prev</FrameButton>
        <FrameButton>next</FrameButton>
        {/* <FrameButton action="mint" target={nfts[state.pageIndex]!.tokenUrl}>
          Mint
        </FrameButton> */}
      </FrameContainer>
    </div>
  );
}
