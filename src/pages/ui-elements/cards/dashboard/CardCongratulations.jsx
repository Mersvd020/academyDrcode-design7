import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Award } from "react-feather";
import Avatar from "@components/avatar";
import { Card, CardBody, CardText } from "reactstrap";
import decorationLeft from "@src/assets/images/elements/decore-left.png";
import decorationRight from "@src/assets/images/elements/decore-right.png";
import { getProfileInfo } from '../../../../pages/Profile/store';
const CardCongratulations = () => {
  const dispatch = useDispatch();
  const profileInfo = useSelector(state => state.profile.profileInfo);
  useEffect(() => {
    if (!profileInfo) {
      dispatch(getProfileInfo());
    }
  }, [dispatch, profileInfo]);

  return (
    <Card className="card-congratulations">
      <CardBody className="text-center">
        <img className="congratulations-img-left" src={decorationRight} alt="decor-left" />
        <img className="congratulations-img-right" src={decorationLeft} alt="decor-right" />
        <Avatar
          icon={<Award size={28} />}
          className="shadow"
          color="primary"
          size="xl"
        />
        <div className="text-center">
          <h1 className="mb-1 text-white">
            مبارکا, {profileInfo?.fName || 'پسر'}
          </h1>
          <CardText className="m-auto w-75">
            You have done <strong>57.6%</strong> more sales today. Check your
            new badge in your profile.
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardCongratulations;