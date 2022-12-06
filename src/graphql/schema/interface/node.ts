import { interfaceType } from 'nexus';

/**
 * 全てのデータにuniqueなIDを持たせるインターフェース
 * RelayのNodeインターフェースを参考にしている
 */
const node = interfaceType({
  name: 'Node',
  definition(t) {
    t.id('id');
  },
});

export default node;
