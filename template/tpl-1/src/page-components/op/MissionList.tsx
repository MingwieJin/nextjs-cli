import React, { useEffect, useState } from 'react';
import {
  Select,
  Form,
  Input,
  Row,
  Col,
  Pagination,
  Empty,
  message,
  Spin,
  Table,
  Tooltip,
  Button,
  Modal,
  Drawer,
  TableColumnProps,
} from 'antd';
import router from 'next/router';
import styles from './styles/missionList.less';


const { Option } = Select;

const MissionList = () => {
  const [menus, setMenus] = useState<Array<any>>();

  return (
      <div>我是个列表页</div>
  );
};

export default MissionList;
