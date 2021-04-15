import { useState } from "react";
import { Header, Icon, Image, List } from "semantic-ui-react";
import { Swiper, SwiperSlide } from "swiper/react";
import _ from "lodash";
import "./PlaceInfo.sass";
import "swiper/swiper.scss";

function PlaceInfo({
  mainImg,
  placeName,
  description,
  media = [],
  params,
  inLocalStorage,
  onFavBtnClick,
}) {
  return (
    <div className="place-info">
      <button className="place-info__fav-btn" onClick={onFavBtnClick}>
        {inLocalStorage ? <Icon name="star" /> : <Icon name="star outline" />}
      </button>
      <div className="place-info__base-info">
        <Header as="h1">{placeName}</Header>
        <p className="place-info__desc">{description}</p>
        <List className="place-info__params">
          {_.map(params, (value, key) =>
            value ? (
              <List.Item>
                <List.Header>{key}</List.Header>
                {value}
              </List.Item>
            ) : null
          )}
        </List>
        <div>
          <Swiper
            className="place-info__swiper"
            spaceBetween={50}
            slidesPerView={media.length >= 2 ? 2 : 1}
            observer
            observeParents
            observeSlideChildren
          >
            {media.map(url => (
              <SwiperSlide>
                {getUrlExtension(url) === "jpg" ? (
                  <Image src={url} />
                ) : (
                  <video className="place-info__video" controls="controls">
                    <source src={url} />
                  </video>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Image className="place-info__main-img" src={mainImg} size="big" />
    </div>
  );

  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }
}

export default PlaceInfo;
