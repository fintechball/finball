import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./GroupAccount.module.scss";
import GroupFinball from "../Pinball/GroupFinball";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import GroupAccountModal from "../../components/GroupAccount/GroupAccountModal";
import { setAccount } from "../../store/slices/accountSlice";
import { useParams } from "react-router-dom";
import { setGroupFinball } from "../../store/slices/groupfinballSlice";
import { ResponsivePie } from "@nivo/pie";

function formatMoney(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const GroupAccount = () => {
  const [value, setValue] = useState({ parent: "groupfinball-canvas" });
  const [data, setData] = useState({});
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  // 계좌번호
  const accountNo = useParams().no;
  const companyCode = 106;

  // setMemberData 함수와 handle 함수들을 정의합니다.
  const setMemberData = (data) => {
    // setMemberData 함수의 로직을 작성하세요.
  };

  const handle = {
    padClick: (data) => {
      console.log(data);
      // padClick 핸들러의 로직을 작성하세요.
    },

    legendClick: (data) => {
      console.log(data);
      // legendClick 핸들러의 로직을 작성하세요.
    },
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://j9e106.p.ssafy.io/api/group/account/" + accountNo,
      // url: "http://localhost:8080/api/group/account" + accountNo,
      headers: {
        Authorization: accessToken,
      },
    }).then((res) => {
      setData(res.data.data);
      setValue({ parent: "pinball-canvas" });
      console.log(res.data.data, "here");
      const state = {
        account: {
          no: accountNo,
          name: res.data.data.name,
          balance: res.data.data.balance,
        },
        company: { code: companyCode },
      };
      dispatch(setAccount(state));
      dispatch(
        setGroupFinball({
          members: res.data.data.member,
          balance: res.data.data.balance,
          accountno: res.data.data.accountNo,
          history: res.data.data.tradeHistory,
        })
      );
      setMemberData(res.data.data.member);
    });
  }, []);

  const MemberPieChart = () => {
    if (!data || !data.member) {
      return null;
    }
    return (
      <div style={{ width: "100px", height: "100px" }}>
        <ResponsivePie
          data={data.member.map((member) => ({
            id: member.name,
            value: member.balance,
          }))}
          // margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          innerRadius={0.6}
          padAngle={3}
          cornerRadius={0}
          colors={[
            "#EF4D4D",
            "#6CB77E",
            "#004FFF",
            "#FFC000",
            "#AF8BB7",
            "#D1EFF0",
          ]}
          theme={{
            labels: {
              text: {
                fontSize: 14,
                fill: "#000000",
              },
            },
            legends: {
              text: {
                fontSize: 12,
                fill: "#000000",
              },
            },
          }}
          onClick={handle.padClick}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "olive",
                  },
                },
              ],
              // onClick: handle.legendClick,
            },
          ]}
        />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {data && data.member ? (
        <div>
          <div className={styles.head}>
            <div className={styles.contents}>
              <div className={styles.bankInfo}>
                <div className={styles.name}>{data.name} 통장</div>
                <div className={styles.smallbank}>
                  <div className={styles.bankName}>핀볼</div>
                  <div className={styles.accountNo}>{data.accountNo}</div>
                </div>
                <div className={styles.memberlength}>
                  <span>{data.member.length}명</span>이 함께하고 있어요.
                </div>
              </div>
              <div className={styles.accountBalance}>
                <div className={styles.balance}>
                  {data.balance.toLocaleString()}원
                </div>
              </div>
            </div>
            <div className={styles.piechart} onClick={openModal}>
              <MemberPieChart />
            </div>
            {/* <div className={styles.members}>
              <div className={styles.piechart} onClick={openModal}>
                <MemberPieChart />
              </div>
              
            </div> */}
          </div>
          {isModalOpen && (
            <GroupAccountModal onClose={closeModal} data={data} />
          )}
          <div id="pinball-canvas" className={styles.finballBox}>
            <GroupFinball value={value} state={data} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GroupAccount;
