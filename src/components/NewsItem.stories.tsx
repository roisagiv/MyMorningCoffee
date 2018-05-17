/* tslint:disable:no-implicit-dependencies */
import { storiesOf } from "@storybook/react-native"
import React from "react"

import NewsItem from './NewsItem';

storiesOf('NewsItem', module)
    .add("default", () => {
        return <NewsItem />;
    });