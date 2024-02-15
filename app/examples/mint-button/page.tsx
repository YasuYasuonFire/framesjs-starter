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
  spinning: boolean;
};

const nfts: {
  src: string;
  tokenUrl: string;
}[] = [
  // NFTの画像URLとトークンURLを定義
  {
    src: "https://ipfs.decentralized-content.com/ipfs/bafybeifs7vasy5zbmnpixt7tb6efi35kcrmpoz53d3vg5pwjz52q7fl6pq/cook.png",
    tokenUrl: getTokenUrl({
      address: "0x99de131ff1223c4f47316c0bb50e42f356dafdaa",
      chain: zora,
      tokenId: "2",
    }),
  },
  {
    src: "https://1.bp.blogspot.com/-wgq7rsKGgHk/X5Ocd_XeOyI/AAAAAAABb_A/QYte62QLgcw0EwBQybh6iH6rlIw4nsp1gCNcBGAsYHQ/s1029/photo_camera_man.png",
    tokenUrl: getTokenUrl({
      address: "0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df",
      chain: zora,
      tokenId: "1",
    }),
  },
  {
    src: "https://remote-image.decentralized-content.com/image?url=https%3A%2F%2Fipfs.decentralized-content.com%2Fipfs%2Fbafybeidc6e5t3qmyckqh4fr2ewrov5asmeuv4djycopvo3ro366nd3bfpu&w=1920&q=75",
    tokenUrl: getTokenUrl({
      address: "0x8f5ed2503b71e8492badd21d5aaef75d65ac0042",
      chain: zora,
      tokenId: "3",
    }),
  },
];
const initialState: State = { pageIndex: 0, spinning: false };

const reducer: FrameReducer<State> = (state, action) => {
  // ルーレット回転アクションを追加
  if (action.type === "SPIN_ROULETTE") {
    return {
      ...state,
      pageIndex: Math.floor(Math.random() * nfts.length),
      spinning: true,
    };
  }

  return state;
};

export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(searchParams);
  const [state, dispatch] = useFramesReducer<State>(reducer, initialState, previousFrame);

  return (
    <div>
      <FrameContainer
        pathname="/examples/mint-button"
        postUrl="/examples/mint-button/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage
          src={nfts[state.pageIndex].src}
          aspectRatio="1:1"
        ></FrameImage>
        <FrameButton onClick={() => dispatch({ type: "SPIN_ROULETTE" })}>
          Spin Roulette
        </FrameButton>
      </FrameContainer>
      {state.spinning && <p>おみくじの結果がここに表示されます</p>}
    </div>
  );
}
